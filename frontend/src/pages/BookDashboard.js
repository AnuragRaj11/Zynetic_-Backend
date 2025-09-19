import React, { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import AddBookForm from "./AddBookForm";

const BookDashboard = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <div>
      <h1>📚 Book Dashboard</h1>
      <AddBookForm onBookAdded={handleBookAdded} />

      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}
              {book.description && <p>{book.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookDashboard;
