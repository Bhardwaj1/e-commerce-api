const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// 🔑 Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } 
  );
};
    
// 🔐 REGISTER CONTROLLER
const register = async (req, res) => {
  const { name, email, password,phone } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let userContact= await User.findOne({phone});

    if (userContact) {
      return res.status(400).json({message:'Phone Number already exists'});
    }

    // Force role to customer
    user = await User.create({ name, email, password,phone, role: 'customer' });

    // Return token and user info
    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone:user.phone
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🔑 LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return token and user info
    res.status(200).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  register,
  login,
};
