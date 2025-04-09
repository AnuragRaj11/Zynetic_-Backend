import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const connectDatabase = async (mongoUrl = process.env.MONGO_URI) => {
    try {
        if (!mongoUrl || typeof mongoUrl !== 'string') {
            throw new Error('MongoDB URI is undefined or not a string');
        }

        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDatabase;
