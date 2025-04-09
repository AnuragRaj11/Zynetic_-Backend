import mongoose from 'mongoose';


const tokenSchema = new mongoose.Schema({
    token: String,
    userId: mongoose.Schema.Types.ObjectId,
    createdAt: { 
      type: Date, 
      default: Date.now,
      expires: 3600 // Auto-delete documents after 1 hour
    }
  });
  

const Token = mongoose.model('Token', tokenSchema);

export default Token;
