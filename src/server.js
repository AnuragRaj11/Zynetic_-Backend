import express from 'express';
import cors from 'cors';
import terminalLink from 'terminal-link';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './db/connection.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

// Load environment variables from .env
dotenv.config();

// Load __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const config = {
    port: process.env.PORT || 4000,
    mongoUrl: process.env.MONGO_URI,
    jwtSecret: process.env.SECRET,
    tokenExpiry: '1h'
};

// Ensure Mongo URI is available
if (!config.mongoUrl) {
    console.error('❌ MONGO_URI is missing in your .env file');
    process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDatabase(config.mongoUrl);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// 👇 Add a simple route for root URL
app.get('/', (req, res) => {
    res.send('📚 Welcome to Zynetic Book API!');
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ message: '✅ Server is healthy' });
});

// Serve frontend if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}

// Start server
app.listen(config.port, () => {
    const link = terminalLink('Click here', `http://localhost:${config.port}`);
    console.clear();
    console.log('========================================');
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`🌐 Access it locally: ${link}`);
    console.log('========================================\n');
});

export { config };
export default app;
