// Performance and Error Tracking Middleware

const performanceMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Override res.json to track response time
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - startTime;
    res.set('X-Response-Time', `${duration}ms`);
    return originalJson.call(this, data);
  };
  
  next();
};

const errorTrackingMiddleware = (err, req, res, next) => {
  console.error('Error tracked:', {
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    error: err.message
  });
  next(err);
};

module.exports = {
  performanceMiddleware,
  errorTrackingMiddleware
};
