const mongoose = require('mongoose');
require('dotenv').config(); // Ensure env variables are loaded

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';

    if (!mongoURI || typeof mongoURI !== 'string') {
      throw new Error('❌ MONGO_URI is missing or not a valid string');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
