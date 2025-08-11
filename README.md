# Smart Borehole Monitoring System (SBMS)

## Overview
The **Smart Borehole Monitoring System (SBMS)** is an IoT-powered platform for **real-time monitoring, control, and analysis** of rural borehole water systems. Designed to ensure **efficient water management**, it helps prevent pump failures, optimize water usage, and facilitate proactive maintenance, especially in **rural communities**.

## 🌐 Features
- 📊 **Real-Time Data Visualization** (Water level, Pump status, Vibration, Connectivity)
- 📈 **Historical Trends & Analytics** (Usage, Water level, Vibration)
- 🚨 **Alerting System** (Pump issues, Low water level, Sensor failures)
- 🛠️ **Maintenance Logging**
- 🔐 **User Roles & Permissions** (Admin, Technician, Viewer)
- 🌎 **Remote IoT Data Integration** (via ESP32 microcontroller)
- 💾 **MongoDB Data Storage** (sensor data, alerts, maintenance logs)
- 🔐 **JWT-Based Secure API Authentication**

---

## System Architecture


---

## 🛠️ Technologies Used

| Component           | Technology                               |
|---------------------|------------------------------------------|
| IoT Hardware        | ESP32 Microcontroller, Ultrasonic Sensor, Vibration Sensor |
| Backend API         | Node.js, Express.js, JWT Auth            |
| Database            | MongoDB (Mongoose ODM)                   |
| Frontend Dashboard  | React, TypeScript, Tailwind CSS          |
| Hosting (Frontend)  | Azure Static Web Apps           |
| Hosting (Backend)   | Render / Railway / Azure App Service     |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone "https://github.com/Liwei254/HydroSmart.git"
cd sbms
cd backend
npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_ARDUINO_IP=192.168.xxx.xxx
ARDUINO_JWT=eyJhbGciOiJI...
npm start
cd frontend
npm install
const instance = axios.create({
  baseURL: 'http://192.168.xxx.xxx:5000/api', // Backend IP
});
npm run dev
const char* ssid = "Your_WiFi_Name";
const char* password = "Your_WiFi_Password";

String backendURL = "http://192.168.xxx.xxx:5000/api/sensor-data";
String authToken = "Bearer eyJhbGciOiJIUz...";  // Arduino JWT
