import http from 'http';

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:3001';
const NUM_SESSIONS = 50;
const CONCURRENT_SESSIONS = 10; // Number of sessions to run simultaneously

const fruits = ['banana', 'apple', 'strawberry'];
const fruitIds = [1, 2, 3]; // Banana=1, Apple=2, Strawberry=3
const pages = ['shop', 'history', 'fruits/1', 'fruits/2', 'fruits/3'];

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ 
          status: res.statusCode, 
          data: data ? (data.startsWith('{') || data.startsWith('[') ? JSON.parse(data) : data) : null 
        });
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Helper function to sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate a single user session
async function simulateUserSession(sessionId) {
  try {
    console.log(`👤 Session ${sessionId}: Starting...`);

    // 1. Visit shop page
    await makeRequest(`${FRONTEND_URL}/shop`);
    console.log(`👤 Session ${sessionId}: Visited shop page`);
    await sleep(Math.random() * 1000 + 500);

    // 2. Get fruits list
    const fruitsResponse = await makeRequest(`${BACKEND_URL}/api/fruits`);
    console.log(`👤 Session ${sessionId}: Fetched fruits list`);
    await sleep(Math.random() * 500 + 300);

    // 3. Get initial cart state
    await makeRequest(`${BACKEND_URL}/api/cart`);
    console.log(`👤 Session ${sessionId}: Checked cart`);
    await sleep(Math.random() * 500 + 200);

    // 4. Add random items to cart
    const numItems = Math.floor(Math.random() * 5) + 1;
    console.log(`👤 Session ${sessionId}: Adding ${numItems} items to cart`);
    
    for (let i = 0; i < numItems; i++) {
      const fruit = fruits[Math.floor(Math.random() * fruits.length)];
      await makeRequest(`${BACKEND_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', fruitId: fruit })
      });
      console.log(`👤 Session ${sessionId}: Added ${fruit} to cart`);
      await sleep(Math.random() * 1000 + 500);
    }

    // 5. Maybe remove an item (30% chance)
    if (Math.random() > 0.7) {
      const fruit = fruits[Math.floor(Math.random() * fruits.length)];
      await makeRequest(`${BACKEND_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', fruitId: fruit })
      });
      console.log(`👤 Session ${sessionId}: Removed ${fruit} from cart`);
      await sleep(Math.random() * 800 + 300);
    }

    // 6. Maybe blend (60% chance)
    if (Math.random() > 0.4) {
      await makeRequest(`${BACKEND_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'blend' })
      });
      console.log(`👤 Session ${sessionId}: Blended the smoothie! 🍹`);
      await sleep(Math.random() * 1000 + 500);
    }

    // 7. Browse fruit detail pages (50% chance)
    if (Math.random() > 0.5) {
      const numPagesToVisit = Math.floor(Math.random() * 3) + 1; // Visit 1-3 fruit pages
      console.log(`👤 Session ${sessionId}: Browsing ${numPagesToVisit} fruit detail page(s)`);
      
      for (let i = 0; i < numPagesToVisit; i++) {
        const fruitId = fruitIds[Math.floor(Math.random() * fruitIds.length)];
        const fruitName = fruits[fruitId - 1]; // Convert ID to name
        await makeRequest(`${FRONTEND_URL}/fruits/${fruitId}`); // Navigate to /fruits/1, /fruits/2, or /fruits/3
        console.log(`👤 Session ${sessionId}: Viewing ${fruitName} detail page (ID: ${fruitId})`);
        await sleep(Math.random() * 2000 + 1000); // Spend 1-3 seconds reading
      }
      
      // Return to shop (40% chance)
      if (Math.random() > 0.6) {
        await makeRequest(`${FRONTEND_URL}/shop`);
        console.log(`👤 Session ${sessionId}: Returned to shop`);
        await sleep(Math.random() * 1000 + 500);
      }
    }

    // 8. View history page (30% chance)
    if (Math.random() > 0.7) {
      await makeRequest(`${FRONTEND_URL}/history`);
      console.log(`👤 Session ${sessionId}: Viewed history page`);
      await sleep(Math.random() * 1500 + 500);
    }

    // 9. Check health endpoint occasionally (15% chance)
    if (Math.random() > 0.85) {
      await makeRequest(`${BACKEND_URL}/api/health`);
      console.log(`👤 Session ${sessionId}: Checked health endpoint`);
    }

    console.log(`✅ Session ${sessionId}: Completed successfully!\n`);
  } catch (error) {
    console.error(`❌ Session ${sessionId}: Error - ${error.message}\n`);
  }
}

// Process sessions in concurrent batches
async function processBatch(sessionIds) {
  const batchPromises = sessionIds.map(id => simulateUserSession(id));
  await Promise.all(batchPromises);
}

// Main function to generate traffic with concurrent sessions
async function generateTraffic() {
  console.log('🚀 Starting Fruit Blender Traffic Generator (Optimized)\n');
  console.log(`📊 Configuration:`);
  console.log(`   - Frontend URL: ${FRONTEND_URL}`);
  console.log(`   - Backend URL: ${BACKEND_URL}`);
  console.log(`   - Total sessions: ${NUM_SESSIONS}`);
  console.log(`   - Concurrent sessions: ${CONCURRENT_SESSIONS}`);
  console.log(`   - Available fruits: ${fruits.join(', ')}`);
  console.log(`   - Available pages: ${pages.join(', ')}\n`);
  console.log('=' .repeat(60) + '\n');

  const startTime = Date.now();
  let completedSessions = 0;

  // Create batches of sessions
  const batches = [];
  for (let i = 1; i <= NUM_SESSIONS; i += CONCURRENT_SESSIONS) {
    const batch = [];
    for (let j = 0; j < CONCURRENT_SESSIONS && (i + j) <= NUM_SESSIONS; j++) {
      batch.push(i + j);
    }
    batches.push(batch);
  }

  console.log(`📦 Processing ${batches.length} batches of ${CONCURRENT_SESSIONS} concurrent sessions\n`);

  // Process batches sequentially, but sessions within each batch run concurrently
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`🔄 Starting batch ${batchIndex + 1}/${batches.length} (Sessions ${batch[0]}-${batch[batch.length - 1]})`);
    
    await processBatch(batch);
    
    completedSessions += batch.length;
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    const rate = (completedSessions / elapsed).toFixed(2);
    console.log(`✅ Batch ${batchIndex + 1} complete! Progress: ${completedSessions}/${NUM_SESSIONS} (${rate} sessions/sec)\n`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('=' .repeat(60));
  console.log(`\n✅ Traffic generation complete!`);
  console.log(`📊 Final Stats:`);
  console.log(`   - Total sessions: ${NUM_SESSIONS}`);
  console.log(`   - Concurrent sessions: ${CONCURRENT_SESSIONS}`);
  console.log(`   - Total duration: ${duration} seconds`);
  console.log(`   - Average rate: ${(NUM_SESSIONS / duration).toFixed(2)} sessions/second`);
  console.log(`   - Time per session: ${(duration / NUM_SESSIONS).toFixed(2)} seconds\n`);
}

// Run the traffic generator
generateTraffic().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

