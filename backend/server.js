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

app.get('/api/cart', (req, res) => {
  res.json({ cart, blendHistory });
});

app.post('/api/cart', (req, res) => {
  try {
    const { action, fruitId } = req.body;
    
    if (action === 'add') {
      cart[fruitId] = (cart[fruitId] || 0) + 1;
    } else if (action === 'remove') {
      if (cart[fruitId] > 1) {
        cart[fruitId] -= 1;
      } else {
        delete cart[fruitId];
      }
    } else if (action === 'blend') {
      // Calculate blend details
      const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
      const totalPrice = Object.entries(cart).reduce((total, [fruitId, count]) => {
        const fruit = fruits.find(f => f.id === fruitId);
        return total + (fruit.price * count);
      }, 0);
      
      const blendItems = Object.entries(cart).map(([fruitId, count]) => {
        const fruit = fruits.find(f => f.id === fruitId);
        return { name: fruit.name, emoji: fruit.emoji, count, price: fruit.price };
      });
      
      const newBlend = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        items: blendItems,
        totalItems,
        totalPrice
      };
      
      // Save to history and clear cart
      blendHistory.unshift(newBlend);
      cart = {};
      
      return res.json({ 
        success: true, 
        blend: newBlend,
        cart: {},
        blendHistory 
      });
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
