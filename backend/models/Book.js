import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  genre: { type: String },   // ❌ remove "required"
  year: { type: Number }     // ❌ remove "required"
});

export default mongoose.model("Book", bookSchema);
