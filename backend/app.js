const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Allow requests from frontend only
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8082']; // add your frontend URL/port here
credentials: true // allow cookies and auth headers
app.use(cors({
  origin: allowedOrigins,
  credentials: true // allow sending Authorization headers or cookies
}));

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Smart Borehole Monitoring System Backend is running');
});

// Routes
const testRoutes = require('./routes/test');
const sensorDataRoutes = require('./routes/sensorData');
const alertRoutes = require('./routes/alerts');
const authRoutes = require('./routes/auth');
const maintenanceRoutes = require('./routes/maintenance');

// Use routes
app.use('/api/test', testRoutes);
app.use('/api/sensor-data', sensorDataRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/maintenance', maintenanceRoutes);

module.exports = app;
