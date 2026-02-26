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

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://tekvoro.com',
      'https://www.tekvoro.com'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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
    // Retry connection every 10 seconds instead of crashing
    setTimeout(connectMongoDB, 10000);
  });
};

// Initial connection attempt
connectMongoDB();

// Middleware to check database status for API requests
app.use('/api', (req, res, next) => {
  // Health check and analytics can work without DB
  if (req.path === '/health' || req.path === '/analytics/track') {
    return next();
  }
  
  // For other API routes, warn if DB not connected
  if (!dbConnected) {
    return res.status(503).json({
      error: 'Service Temporarily Unavailable',
      message: 'Database connection establishing. Please try again in a moment.',
      timestamp: new Date().toISOString()
    });
  }
  
  next();
});

// Routes - MUST come before static file serving
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

// Serve static files from frontend build AFTER routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
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

// SPA fallback - serve index.html for non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    // Only serve SPA for non-API routes
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
    // For unmapped API routes, return 404
    res.status(404).json({
      error: 'Not Found',
      message: `API route ${req.originalUrl} not found`
    });
  });
} else {
  // 404 handler for development
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`
    });
  });
}

// Start server
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🎯 Tekvoro API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
