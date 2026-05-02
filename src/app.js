require('dotenv').config();
const redisClient = require('./config/redis');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const connectDB = require('./config/db');
const feedRoutes = require('./routes/feedRoutes');
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// Root route
app.get('/', (req, res) => {
  res.send('Social Feed API Running');
});

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Social Feed API is running smoothly.',
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      redis: redisClient.isReady ? 'connected' : 'disconnected'
    },
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/feed', feedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});