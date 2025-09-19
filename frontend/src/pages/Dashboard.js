import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
    }
  };

  const seedBooks = async () => {
    try {
      await axios.post("http://localhost:5000/api/books/seed");
      alert("✅ Sample books seeded!");
      fetchBooks();
    } catch (err) {
      console.error("❌ Error seeding books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>📚 Book Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={seedBooks}>Seed Sample Books</button>
      </div>

      {books.length === 0 ? (
        <p style={{ textAlign: "center" }}>No books available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {books.map((book) => (
            <div
              key={book._id}
              style={{
                background: "rgba(36, 0, 70, 0.85)",
                border: "1px solid rgba(123, 44, 191, 0.4)",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h2 style={{ color: "var(--secondary-color)", marginBottom: "10px" }}>
                {book.title}
              </h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
