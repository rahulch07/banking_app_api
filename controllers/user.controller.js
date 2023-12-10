// backend/controllers/user.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user._id);
    //console.log(user);
    res.json({ accessToken, userId: user._id, role:user.role });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};