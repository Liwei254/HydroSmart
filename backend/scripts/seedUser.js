const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping seeding.');
      process.exit();
    }

    const users = [
      { username: 'admin_user', password: 'admin123', role: 'admin' },
      { username: 'tech_user', password: 'tech123', role: 'technician' },
      { username: 'viewer_user', password: 'viewer123', role: 'viewer' },
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.username}`);
    }

    console.log('Seeding completed.');
    process.exit();
  } catch (err) {
    console.error('Error seeding users:', err);
    process.exit(1);
  }
};

seedUsers();