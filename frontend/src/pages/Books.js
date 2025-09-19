import React, { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", year: "" });

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", newBook);
      setNewBook({ title: "", author: "", genre: "", year: "" });
      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Book Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #9d4edd"
        }}
      />

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={newBook.year}
          onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
        />
        <button type="submit">➕ Add Book</button>
      </form>

      {/* Book List in Cards */}
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px"
        }}>
          {filteredBooks.map((book) => (
            <div key={book._id} style={{
              background: "rgba(36, 0, 70, 0.85)",
              border: "1px solid rgba(123, 44, 191, 0.4)",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
            }}>
              <h2 style={{ color: "#9d4edd" }}>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <button
                onClick={() => handleDeleteBook(book._id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#ff6b6b",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
