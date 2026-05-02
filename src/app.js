require('dotenv').config();
require('./config/redis');

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

// Basic health check route
app.get('/', (req, res) => {
  res.send('Social Feed API Running');
});

// Routes
app.use('/api/feed', feedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});