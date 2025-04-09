import jwt from 'jsonwebtoken';
import User from '../../schemas/users.js';
import Token from '../../schemas/tokens.js';
import { config } from '../server.js';

// Function to generate and save JWT token
const generateToken = async (userId) => {
    const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.tokenExpiry });

    const tokenDocument = new Token({
        token,
        userId,
    });

    await tokenDocument.save();
    return token;
};

// Register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide both email and password' });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide both email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid User ID' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        const token = await generateToken(user._id);

        res.status(200).json({
            message: 'Login successful',
            token,
            userId: user._id,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(400).json({ error: 'No token provided' });
        }

        const deletedToken = await Token.deleteOne({ token });

        if (deletedToken.deletedCount === 0) {
            return res.status(404).json({ message: 'Token not found or already logged out' });
        }

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Server error during logout' });
    }
}; 