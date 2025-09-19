import express from "express";
import { getBooks, addBook, deleteBook } from "../controllers/bookController.js";
import Book from "../models/Book.js";

const router = express.Router();

// 📌 Seed books
router.post("/seed", async (req, res) => {
  try {
    const books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.",
        price: 350,
        category: "Classic Literature",
        image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        genre: "Novel",
        year: 1925,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "An easy & proven way to build good habits and break bad ones.",
        price: 499,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/9259256-L.jpg",
        genre: "Self Improvement",
        year: 2018,
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        description: "Your journey to mastery in software development with practical advice.",
        price: 799,
        category: "Programming",
        image: "https://covers.openlibrary.org/b/id/11046147-L.jpg",
        genre: "Technology",
        year: 1999,
      },
      {
        title: "Harry Potter and the Sorcerer’s Stone",
        author: "J.K. Rowling",
        description: "The first book in the Harry Potter fantasy series.",
        price: 450,
        category: "Fantasy",
        image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
        genre: "Fantasy",
        year: 1997,
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        description: "What the rich teach their kids about money that the poor and middle class do not.",
        price: 299,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/8231992-L.jpg",
        genre: "Finance",
        year: 1997,
      },
    ];

    await Book.deleteMany();
    const createdBooks = await Book.insertMany(books);
    res.status(201).json({ message: "Books seeded successfully", books: createdBooks });
  } catch (err) {
    console.error("❌ Error seeding books:", err);
    res.status(500).json({ error: "Failed to seed books" });
  }
});

// 📌 Normal book routes
router.get("/", getBooks);
router.post("/", addBook);
router.delete("/:id", deleteBook);

export default router;
