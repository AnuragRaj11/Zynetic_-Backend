import React, { useState } from "react";
import { addBook } from "../services/api";

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = await addBook({ title, author, description });
      setMessage("✅ Book added successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      if (onBookAdded) onBookAdded(newBook.book); // refresh list in dashboard
    } catch (err) {
      setMessage("❌ Error adding book");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm; 
