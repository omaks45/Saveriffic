const User = require('../models/user'); // Adjust the path based on your project structure

const signup = async (req, res) => {
  try {
    const { name, phoneNumber, email, password, confirmPassword, referralCode } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      phoneNumber,
      email,
      password,
      referralCode,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    console.error('Error during signup:', error);

    // Check for duplicate key error (unique constraint violation)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email or phone number already exists.' });
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
};
