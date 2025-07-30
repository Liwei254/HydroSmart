const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return user info (exclude password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { loginUser };
