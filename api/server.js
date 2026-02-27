const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const contactRoutes = require('./routes/contact');
const subscriptionRoutes = require('./routes/subscription');
const analyticsRoutes = require('./routes/analytics');
const ticketsRoutes = require('./routes/tickets');
const eventsRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');

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

// Database connection with graceful degradation
let dbConnected = false;
let lastDbError = null;

const connectMongoDB = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tekvoro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })
  .then(() => {
    dbConnected = true;
    lastDbError = null;
    console.log('✅ Connected to MongoDB');
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
app.use('/api/tickets', ticketsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/admin', adminRoutes);

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
