const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Smart Borehole Monitoring System Backend is running');
});

const testRoutes = require('./routes/test');
app.use('/api/test', testRoutes);


// Import routes
const sensorDataRoutes = require('./routes/sensorData');
const alertRoutes = require('./routes/alerts');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/sensor-data', sensorDataRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
