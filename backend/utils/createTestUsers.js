const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const createTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = [
      { username: 'adminUser', password: 'adminPass123', role: 'admin' },
      { username: 'techUser', password: 'techPass123', role: 'technician' },
      { username: 'viewerUser', password: 'viewerPass123', role: 'viewer' },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const user = new User({
          username: userData.username,
          password: hashedPassword,
          role: userData.role,
        });
        await user.save();
        console.log(`Created user: ${userData.username} with role: ${userData.role}`);
      } else {
        console.log(`User ${userData.username} already exists`);
      }
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating test users:', error);
    process.exit(1);
  }
};

createTestUsers();
