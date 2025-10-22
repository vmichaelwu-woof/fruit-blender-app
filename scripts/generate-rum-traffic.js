import { chromium } from 'playwright';

const FRONTEND_URL = 'http://localhost:3000';
const NUM_SESSIONS = 20; // Number of browser sessions to simulate
const CONCURRENT_SESSIONS = 5; // Run 5 browsers at once for speed
const HEADLESS = true; // Set to false to see the browser in action

const fruitIds = [1, 2, 3];
const fruitNames = ['Banana', 'Apple', 'Strawberry'];

// Helper function to sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate a single user session with a real browser
async function simulateUserSession(sessionId) {
  let browser;
  let context;
  let page;
  
  try {
    console.log(`👤 Session ${sessionId}: Starting browser...`);
    
    // Launch browser
    browser = await chromium.launch({ 
      headless: HEADLESS,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Create a new context (like a new incognito window)
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
    
    page = await context.newPage();
    
    // Enable console logging from the page (only Datadog messages)
    page.on('console', msg => {
      if (msg.text().includes('Datadog RUM')) {
        console.log(`   📊 [Session ${sessionId}] ${msg.text()}`);
      }
    });

    // 1. Visit shop page
    console.log(`👤 Session ${sessionId}: Visiting shop page...`);
    await page.goto(`${FRONTEND_URL}/shop`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await sleep(500); // Short wait for RUM to initialize

    // 2. Add random items to cart (faster, no waiting for specific buttons)
    const numItems = Math.floor(Math.random() * 3) + 1;
    console.log(`👤 Session ${sessionId}: Adding ${numItems} items to cart`);
    
    for (let i = 0; i < numItems; i++) {
      try {
        // Click any "Add" button that's visible
        const addButtons = await page.$$('button:has-text("Add")');
        if (addButtons.length > 0) {
          const randomButton = addButtons[Math.floor(Math.random() * addButtons.length)];
          await randomButton.click();
          console.log(`👤 Session ${sessionId}: Added item to cart`);
          await sleep(300);
        }
      } catch (error) {
        // Silently continue if button not found
      }
    }

    // 3. Maybe blend (50% chance)
    if (Math.random() > 0.5) {
      try {
        const blendButton = await page.$('button:has-text("Blend")');
        if (blendButton) {
          await blendButton.click();
          console.log(`👤 Session ${sessionId}: Blended the smoothie! 🍹`);
          await sleep(1000);
        }
      } catch (error) {
        // Silently continue
      }
    }

    // 4. Browse fruit detail pages (80% chance)
    if (Math.random() > 0.2) {
      const numPagesToVisit = Math.floor(Math.random() * 3) + 1;
      console.log(`👤 Session ${sessionId}: Browsing ${numPagesToVisit} fruit detail page(s)`);
      
      for (let i = 0; i < numPagesToVisit; i++) {
        const fruitId = fruitIds[Math.floor(Math.random() * fruitIds.length)];
        const fruitName = fruitNames[fruitId - 1];
        
        console.log(`👤 Session ${sessionId}: Viewing ${fruitName} detail page (ID: ${fruitId})`);
        await page.goto(`${FRONTEND_URL}/fruits/${fruitId}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await sleep(800); // Spend less time reading
      }
      
      // Return to shop (50% chance)
      if (Math.random() > 0.5) {
        console.log(`👤 Session ${sessionId}: Returning to shop`);
        await page.goto(`${FRONTEND_URL}/shop`, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await sleep(300);
      }
    }

    // 5. View history page (30% chance)
    if (Math.random() > 0.7) {
      console.log(`👤 Session ${sessionId}: Viewing history page`);
      await page.goto(`${FRONTEND_URL}/history`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await sleep(500);
    }

    console.log(`✅ Session ${sessionId}: Completed successfully!\n`);
    
  } catch (error) {
    console.error(`❌ Session ${sessionId}: Error - ${error.message}\n`);
  } finally {
    // Clean up
    try {
      if (page) await page.close();
      if (context) await context.close();
      if (browser) await browser.close();
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

// Process sessions in concurrent batches
async function processBatch(sessionIds) {
  const batchPromises = sessionIds.map(id => simulateUserSession(id));
  await Promise.all(batchPromises);
}

// Main function to generate RUM traffic
async function generateRUMTraffic() {
  console.log('🚀 Starting Datadog RUM Traffic Generator (Optimized)\n');
  console.log(`📊 Configuration:`);
  console.log(`   - Frontend URL: ${FRONTEND_URL}`);
  console.log(`   - Total sessions: ${NUM_SESSIONS}`);
  console.log(`   - Concurrent sessions: ${CONCURRENT_SESSIONS}`);
  console.log(`   - Headless mode: ${HEADLESS}`);
  console.log(`   - Fruit IDs: ${fruitIds.join(', ')}\n`);
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
  console.log(`\n✅ RUM traffic generation complete!`);
  console.log(`📊 Final Stats:`);
  console.log(`   - Total sessions: ${NUM_SESSIONS}`);
  console.log(`   - Concurrent sessions: ${CONCURRENT_SESSIONS}`);
  console.log(`   - Total duration: ${duration} seconds`);
  console.log(`   - Average rate: ${(NUM_SESSIONS / duration).toFixed(2)} sessions/second`);
  console.log(`   - Time per session: ${(duration / NUM_SESSIONS).toFixed(2)} seconds`);
  console.log(`\n💡 Check your Datadog RUM dashboard for the sessions!\n`);
}

// Run the RUM traffic generator
generateRUMTraffic().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
