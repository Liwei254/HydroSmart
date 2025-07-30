const User = require('../models/user');

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Create and save new user
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    // Return success response without password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { registerUser };
