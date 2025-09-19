import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getBooks = async () => {
  const res = await axios.get(`${API_BASE}/books/getbooks`);
  return res.data;
};

export const addBook = async (data) => {
  const res = await axios.post(`${API_BASE}/books/add`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
