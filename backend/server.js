import tracer from 'dd-trace';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { FRUITS } from './constants.js';
import { config } from './config.js';
import dotenv from 'dotenv';

// APM Setup
tracer.init();
dotenv.config();

// ES6 modules don't have __dirname, so we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// In-memory storage (in production, use a database)
let cart = {};
let blendHistory = [];

// Use shared constants
const fruits = FRUITS;

// Routes
app.get('/api', (req, res) => {
  res.send('hello from the backend');
});

app.get('/api/fruits', (req, res) => {
  res.json({ fruits });
});

// Get detailed information about a specific fruit
app.get('/api/fruits/:fruitId', (req, res) => {
  const { fruitId } = req.params;
  
  const fruitInfo = {
    banana: {
      id: 'banana',
      name: 'Banana',
      price: 0.50,
      origin: 'Southeast Asia',
      facts: [
        'Bananas are technically berries, while strawberries are not!',
        'The scientific name for banana is "musa sapientum" which means "fruit of the wise men"',
        'Bananas float in water because they are less dense than water',
        'India is the world\'s largest producer of bananas',
        'Bananas are naturally radioactive due to their potassium content'
      ],
      history: 'Bananas have been cultivated for over 7,000 years and are believed to be one of the first fruits cultivated by humans. They were first domesticated in Southeast Asia and Papua New Guinea.',
      nutrition: 'Rich in potassium, vitamin B6, and vitamin C. A medium banana contains about 105 calories and provides quick energy.',
      season: 'Available year-round due to tropical growing conditions'
    },
    apple: {
      id: 'apple',
      name: 'Apple',
      price: 0.75,
      origin: 'Central Asia (Kazakhstan)',
      facts: [
        'There are over 7,500 varieties of apples grown worldwide',
        'Apples float in water because they are 25% air',
        'The science of apple growing is called pomology',
        'It takes about 36 apples to create one gallon of apple cider',
        'Apple trees can live for over 100 years'
      ],
      history: 'Apples originated in Central Asia and have been cultivated for thousands of years. They were brought to North America by European colonists in the 17th century.',
      nutrition: 'High in fiber, vitamin C, and various antioxidants. A medium apple contains about 95 calories and the phrase "an apple a day keeps the doctor away" has some scientific backing.',
      season: 'Peak season is fall (September-November), but available year-round'
    },
    strawberry: {
      id: 'strawberry',
      name: 'Strawberry',
      price: 1.00,
      origin: 'Europe and North America',
      facts: [
        'Strawberries are the only fruit with seeds on the outside',
        'One strawberry has about 200 seeds on its exterior',
        'Strawberries are not actually berries - they\'re "aggregate accessory fruits"',
        'Belgium has a museum dedicated to strawberries',
        'Ancient Romans believed strawberries had medicinal properties'
      ],
      history: 'The modern garden strawberry was first bred in Brittany, France in the 1750s. It\'s a hybrid of two wild strawberry species from North America and Chile.',
      nutrition: 'Excellent source of vitamin C, manganese, and antioxidants. One cup contains only 50 calories and more vitamin C than an orange.',
      season: 'Peak season is spring and early summer (April-June)'
    }
  };

  const fruit = fruitInfo[fruitId];
  
  if (!fruit) {
    return res.status(404).json({ error: 'Fruit not found' });
  }
  
  res.json({ fruit });
});

app.get('/api/cart', (req, res) => {
  res.json({ cart, blendHistory });
});

const cartActions = {
  add: (fruitId) => {
    cart[fruitId] = (cart[fruitId] || 0) + 1;
  },
  remove: (fruitId) => {
    if (cart[fruitId] > 1) {
      cart[fruitId] -= 1;
    } else {
      delete cart[fruitId];
    }
  },
  blend: () => {
    const blendItems = Object.entries(cart).map(([fruitId, count]) => {
      const fruit = fruits.find(f => f.id === fruitId);
      return { name: fruit.name, count, price: fruit.price };
    });
    
    const newBlend = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      items: blendItems,
      totalItems: Object.values(cart).reduce((sum, count) => sum + count, 0),
      totalPrice: blendItems.reduce((total, item) => total + (item.price * item.count), 0)
    };
    
    blendHistory.unshift(newBlend);
    cart = {};
    
    return { success: true, blend: newBlend, cart: {}, blendHistory };
  }
};

app.post('/api/cart', (req, res) => {
  try {
    const { action, fruitId } = req.body;
    
    if (action === 'blend') {
      return res.json(cartActions.blend());
    }
    
    if (cartActions[action]) {
      cartActions[action](fruitId);
    }
    
    res.json({ cart, blendHistory });
  } catch (error) {
    console.error('Cart operation error:', error);
    res.status(500).json({ error: 'Failed to process cart operation' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cart: Object.keys(cart).length,
    history: blendHistory.length,
    version: '1.0.0'
  });
});

// API documentation
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'Fruit Blender API',
    version: '1.0.0',
    description: 'API for managing fruit cart and blend operations',
    endpoints: {
      'GET /api': 'Simple hello message',
      'GET /api/fruits': 'Get available fruits',
      'GET /api/cart': 'Get current cart and blend history',
      'POST /api/cart': 'Cart operations (add, remove, blend)',
      'GET /api/health': 'Health check',
      'GET /api/docs': 'API documentation'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Fruit Blender Backend running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🔗 CORS enabled for: ${config.allowedOrigins.join(', ')}`);
  console.log(`📖 API docs: http://localhost:${PORT}/api/docs`);
});
