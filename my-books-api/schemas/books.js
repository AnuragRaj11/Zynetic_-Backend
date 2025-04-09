import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    publishedDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
