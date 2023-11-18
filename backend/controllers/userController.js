const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// To Register a user
// POST request 
// /api/users/register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if any field is missing
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please input all fields' });
        return;
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// To login a user
// POST request 
// /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'Email or Password is incorrect' });
            return;
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Email or Password is incorrect' });
            return;
        }

        // Create a token for the logged-in user
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

        res.json({ token, userID: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};
