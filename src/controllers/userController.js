const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Replace with the path to your user model

exports.register = async (req, res) => {
  try {
    const { name, email , password, photo, role, social } = req.body;

    // Check if userName and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
      photo,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if userName and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Find the user by userName
    const user = await User.findOne({ email });

    // If no user is found, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the user's password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign(
      { _id: user._id, name: user.name , email: user.email , photo: user.photo },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    // Return the user's information and the token
    res.json({
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
