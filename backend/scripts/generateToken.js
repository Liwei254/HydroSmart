// scripts/generateToken.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const payload = {
  id: 'sensor-arduino-001', // Fake ID or sensor ID
  role: 'sensor'            // ✅ Role recognized by backend
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

console.log('Arduino Token:\n', token);
