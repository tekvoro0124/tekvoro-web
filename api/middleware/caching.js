// Caching Middleware for Redis or in-memory cache

const memoryCache = new Map();

const cacheMiddleware = (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }
  
  const key = `${req.path}:${JSON.stringify(req.query)}`;
  
  // Check if result is in cache
  if (memoryCache.has(key)) {
    const cachedData = memoryCache.get(key);
    if (Date.now() - cachedData.timestamp < 5 * 60 * 1000) { // 5 minute cache
      return res.json(cachedData.data);
    } else {
      memoryCache.delete(key);
    }
  }
  
  // Override res.json to cache the response
  const originalJson = res.json;
  res.json = function(data) {
    memoryCache.set(key, {
      data: data,
      timestamp: Date.now()
    });
    return originalJson.call(this, data);
  };
  
  next();
};

module.exports = {
  cacheMiddleware
};
