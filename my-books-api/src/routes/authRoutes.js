import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import authenticator from '../middleware/auth.js';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticator, logout);

export default router;