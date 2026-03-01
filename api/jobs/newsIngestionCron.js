const cron = require('node-cron');
const NewsIngestionService = require('../services/NewsIngestionService');

class NewsIngestionScheduler {
  constructor() {
    this.newsIngestion = new NewsIngestionService();
    this.isRunning = false;
    this.lastIngestionDate = null;
    this.ingestionCount = 0;
  }

  /**
   * Start the scheduled news ingestion
   * Runs every 6 hours (0:00, 6:00, 12:00, 18:00 UTC)
   */
  startScheduler() {
    console.log('[NewsScheduler] Starting news ingestion scheduler...');

    // Schedule ingestion every 6 hours
    // Pattern: 0 */6 * * * (at minute 0, every 6 hours)
    cron.schedule('0 */6 * * *', async () => {
      console.log('[NewsScheduler] Triggered scheduled ingestion');
      await this.runIngestion();
    });

    // Optional: Also run on server startup (after 30 seconds)
    setTimeout(() => {
      console.log('[NewsScheduler] Running initial ingestion...');
      this.runIngestion();
    }, 30000);

    console.log('[NewsScheduler] Scheduler started');
    console.log('[NewsScheduler] Next runs scheduled at: 00:00, 06:00, 12:00, 18:00 UTC');
  }

  /**
   * Run the actual ingestion process
   */
  async runIngestion() {
    if (this.isRunning) {
      console.log('[NewsScheduler] Ingestion already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      console.log('[NewsScheduler] Starting ingestion process at', new Date().toISOString());

      // Step 1: Fetch articles from all feeds
      console.log('[NewsScheduler] Step 1: Fetching articles from RSS feeds...');
      const fetchResults = await this.newsIngestion.fetchFromAllFeeds();

      let totalArticles = 0;
      let totalProcessed = 0;
      let totalFailed = 0;

      // Step 2: Process and store articles
      console.log('[NewsScheduler] Step 2: Processing and storing articles...');
      for (const feedResult of fetchResults) {
        totalArticles += feedResult.articles.length;

        const batchResults = await this.newsIngestion.processAndStoreBatch(feedResult.articles);
        const successful = batchResults.filter(r => r.success).length;
        const failed = batchResults.filter(r => !r.success).length;

        totalProcessed += successful;
        totalFailed += failed;

        console.log(
          `[NewsScheduler] Processed ${feedResult.source}: ${successful} successful, ${failed} failed`
        );
      }

      // Step 3: Mark duplicates
      console.log('[NewsScheduler] Step 3: Identifying and marking duplicates...');
      await this.newsIngestion.markDuplicates();

      // Step 4: Delete old articles
      console.log('[NewsScheduler] Step 4: Cleaning up old articles...');
      const deleteResult = await this.newsIngestion.deleteOldArticles(90);
      console.log(`[NewsScheduler] Deleted ${deleteResult.deletedCount} old articles`);

      // Update stats
      this.lastIngestionDate = new Date();
      this.ingestionCount++;

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log('[NewsScheduler] ✓ Ingestion completed successfully');
      console.log('[NewsScheduler] Summary:');
      console.log(`  - Total articles fetched: ${totalArticles}`);
      console.log(`  - Successfully processed: ${totalProcessed}`);
      console.log(`  - Failed: ${totalFailed}`);
      console.log(`  - Duration: ${duration}s`);
      console.log(`  - Total ingestions run: ${this.ingestionCount}`);
    } catch (error) {
      console.error('[NewsScheduler] ✗ Ingestion failed:', error.message);
      console.error('[NewsScheduler] Stack:', error.stack);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Get ingestion statistics
   */
  getStats() {
    return {
      isRunning: this.isRunning,
      lastIngestionDate: this.lastIngestionDate,
      totalIngestions: this.ingestionCount,
      status: this.isRunning ? 'in-progress' : 'idle'
    };
  }

  /**
   * Stop the scheduler
   */
  stopScheduler() {
    console.log('[NewsScheduler] Stopping scheduler...');
    // Note: node-cron doesn't provide a direct stop method for all tasks
    // You would need to track task references if you want to stop specific tasks
  }

  /**
   * Manually trigger ingestion (for testing/admin)
   */
  async triggerManualIngestion() {
    console.log('[NewsScheduler] Manual ingestion triggered');
    return await this.runIngestion();
  }

  /**
   * Get next scheduled run time
   */
  getNextScheduledRun() {
    const now = new Date();
    const hours = now.getUTCHours();
    const nextScheduledHour = Math.ceil(hours / 6) * 6;

    const next = new Date(now);
    next.setUTCHours(nextScheduledHour % 24, 0, 0, 0);

    if (next <= now) {
      next.setUTCDate(next.getUTCDate() + 1);
    }

    return next;
  }
}

// Export singleton instance
let schedulerInstance = null;

function getScheduler() {
  if (!schedulerInstance) {
    schedulerInstance = new NewsIngestionScheduler();
  }
  return schedulerInstance;
}

module.exports = { NewsIngestionScheduler, getScheduler };
