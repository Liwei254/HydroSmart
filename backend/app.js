const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Allowed Frontend Origins
const allowedOrigins = ['http://localhost:8082',
  'http://localhost:3000', 
  'http://192.168.116.44:3000',
  'http://192.168.116.44:8082',  
  'https://lively-rock-0307c851e.1.azurestaticapps.net'];

// ✅ Apply CORS properly ONCE before routes
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // allow cookies and Authorization headers
}));

// ✅ Body parser middleware
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Smart Borehole Monitoring System Backend is running');
});

// ✅ Routes
const testRoutes = require('./routes/test');
const sensorDataRoutes = require('./routes/sensorData');
const alertRoutes = require('./routes/alerts');
const authRoutes = require('./routes/auth');
const maintenanceRoutes = require('./routes/maintenance');

app.use('/api/test', testRoutes);
app.use('/api/sensor-data', sensorDataRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// ✅ Export the app
module.exports = app;
