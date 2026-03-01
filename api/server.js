const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import performance and caching middleware
const { performanceMiddleware, errorTrackingMiddleware } = require('./middleware/performance');
const { cacheMiddleware } = require('./middleware/caching');

// Import database indexing
const { createIndexes } = require('./utils/indexConfig');

// Import routes
const contentRoutes = require('./routes/content');
const contactRoutes = require('./routes/contact');
const subscriptionRoutes = require('./routes/subscription');
const analyticsRoutes = require('./routes/analytics');
const emailRoutes = require('./routes/email');
const investorsRoutes = require('./routes/investors');
const portfolioRoutes = require('./routes/portfolio');
const ticketsRoutes = require('./routes/tickets');
const eventsRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');
// const staffRoutes = require('./routes/staff');  // Not yet implemented
// const testimonialsRoutes = require('./routes/testimonials');  // Not yet implemented
const newsRoutes = require('./routes/newsRoutes');
const teamRoutes = require('./routes/team');
const chatRoutes = require('./routes/chat');
// const clientsRoutes = require('./routes/clients');  // Not yet implemented
// const marketplaceSearchRoutes = require('./routes/marketplace-search');  // Not yet implemented
const authRoutes = require('./routes/auth');

// Import news ingestion scheduler
const { getScheduler } = require('./jobs/newsIngestionCron');

// Import database models for index creation
const { 
  User, ContactSubmission, Event, BlogPost, EmailSubscription, EmailCampaign, Analytics, 
  Listing, Seller, Driver, Auction,
  // E-commerce models
  Order, Transaction, Invoice, Cart, Subscription, AuditLog, PaymentMethod, ApiToken, UserSession
} = require('./models');

// Initialize Express app
const app = express();

// CRITICAL FIX: Trust proxy headers from Railway
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting with proper proxy trust
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  keyGenerator: (req, res) => {
    return req.ip;
  }
});

app.use(limiter);

// CORS configuration - more permissive for proxies
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://tekvoro.com',
      'https://www.tekvoro.com',
      'https://tekvoro-web-production.up.railway.app'
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Performance tracking middleware
app.use(performanceMiddleware);

// Database connection with graceful degradation
let dbConnected = false;
let lastDbError = null;

const connectMongoDB = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tekvoro', {
    // Production-ready connection pooling
    maxPoolSize: parseInt(process.env.DB_POOL_SIZE) || 100,
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE) || 10,
    maxConnecting: 10,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    retryReads: true
  })
  .then(async () => {
    dbConnected = true;
    lastDbError = null;
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Connection Pool: ${process.env.DB_POOL_SIZE || 100} max, ${process.env.DB_MIN_POOL_SIZE || 10} min`);
    
    // Create indexes for optimization
    try {
      const models = { 
        User, ContactSubmission, Event, BlogPost, EmailSubscription, EmailCampaign, Analytics,
        // E-commerce models
        Order, Transaction, Invoice, Cart, Subscription, AuditLog, PaymentMethod, ApiToken, UserSession,
        // Marketplace models
        Listing, Seller
      };
      await createIndexes(models);
      console.log('✅ Database indexes created/verified');
    } catch (indexError) {
      console.warn('⚠️  Index creation warning:', indexError.message);
    }

    // Start news ingestion scheduler
    try {
      const scheduler = getScheduler();
      scheduler.startScheduler();
      console.log('✅ News ingestion scheduler started');
    } catch (schedulerError) {
      console.warn('⚠️  News scheduler warning:', schedulerError.message);
    }
  })
  .catch((err) => {
    dbConnected = false;
    lastDbError = err.message;
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⏳ Retrying in 10 seconds...');
    setTimeout(connectMongoDB, 10000);
  });
};

connectMongoDB();

// Middleware to check database status
app.use('/api', (req, res, next) => {
  if (req.path === '/health' || req.path === '/analytics/track') {
    return next();
  }
  
  if (!dbConnected) {
    return res.status(503).json({
      error: 'Service Temporarily Unavailable',
      message: 'Database connection establishing. Please try again in a moment.',
      timestamp: new Date().toISOString()
    });
  }
  
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/client', require('./routes/clientAuth'));
app.use('/api/portal', require('./routes/clientPortal'));
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/investors', investorsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/events', eventsRoutes);
// app.use('/api/staff', staffRoutes);  // Not yet implemented
// app.use('/api/testimonials', testimonialsRoutes);  // Not yet implemented
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/chat', chatRoutes);
// app.use('/api/clients', clientsRoutes);  // Not yet implemented
app.use('/api/admin', adminRoutes);
// app.use('/api/admin-monitoring', require('./routes/admin-monitoring'));  // Not yet implemented
// app.use('/api/analytics-advanced', require('./routes/analytics-advanced'));  // Not yet implemented
// app.use('/api/marketplace', marketplaceSearchRoutes);  // Not yet implemented

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Tekvoro API',
    version: '1.0.0',
    database: {
      connected: dbConnected,
      status: dbConnected ? 'Connected' : 'Connecting',
      lastError: lastDbError || null,
      retryTime: dbConnected ? null : 'Every 10 seconds'
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files
const distPath = path.join(__dirname, '../dist');
const fs = require('fs');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: false
  }));
  console.log(`✅ Serving static files from ${distPath}`);
} else {
  console.warn(`⚠️  Static files directory not found: ${distPath}`);
}

// Error tracking middleware
app.use(errorTrackingMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      details: err.message
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// SPA fallback
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
    res.status(404).json({
      error: 'Not Found',
      message: `API route ${req.originalUrl} not found`
    });
  });
} else {
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`
    });
  });
}

// Start server
const PORT = process.env.PORT || 5002;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Tekvoro API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
