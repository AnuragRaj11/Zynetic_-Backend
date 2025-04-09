# 📚 Zynetic Bookstore API

A RESTful API for managing a Bookstore, built using **Node.js** and **Express.js** with MongoDB as the database. This API handles user authentication and CRUD operations for books with filtering and search capabilities.

---

## 🚀 Features

### 🔐 User Authentication
- **Register**: Create a new user account  
- **Login**: Authenticate and receive a JWT token  
- **Logout**: Invalidate user session (handled on frontend/client)  
- All book routes are **protected** and require a valid token  

### 📘 Book Management (CRUD)
- Create a new book  
- Get all books  
- Get a book by ID  
- Update a book by ID  
- Delete a book by ID  

### 🔍 Filter & Search
- Filter books by **author**, **category**, **rating**  
- Search books by **title**  

### ❗ Error Handling
- Returns proper HTTP status codes for errors  
- Validates input data using middleware  

---

## 🛠 Tech Stack

- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JWT  
- **Environment Variables**: `dotenv`  

---

## 🗂 Folder Structure

```
Zynetic-Backend/
│
├── controllers/       # Request handlers
├── models/            # Mongoose schemas
├── routes/            # Auth and Book routes
├── middleware/        # Auth middleware
├── db/                # MongoDB connection
├── .env               # Environment variables
├── server.js          # Entry point
└── frontend/          # Vite + React frontend (in subfolder)
```

---

## 🧪 Sample API Endpoints

> Base URL: `http://localhost:4000/api`

### 🔐 Auth

```
POST   /api/auth/register    - Register user
POST   /api/auth/login       - Login and get token
POST   /api/auth/logout      - Logout user
```

### 📘 Books (Protected)

```
POST   /api/books/createbook             - Add new book
GET    /api/books/getbooks               - Get all books
GET    /api/books/getbook/:id            - Get single book
PATCH  /api/books/updatebook/:id         - Update book
DELETE /api/books/deletebook/:id         - Delete book
GET    /api/books/filterbooks?author=xyz&rating=4    - Filter
GET    /api/books/searchbooks?title=java            - Search
```

---

## 🛠 Setup Instructions

1. **Clone the Repo**
   ```bash
   git clone https://github.com/AnuragRaj11/Zynetic_-Backend.git
   cd Zynetic_-Backend
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create `.env` File**
   ```env
   PORT=4000
   MONGO=mongodb://localhost:27017/bookapi
   SECRET=your_jwt_secret_key_here
   ```

4. **Run Backend**
   ```bash
   npm run dev
   ```

5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🌐 Deployment

- **Backend**: Deployed to Render as web service (Node.js)  
- **Frontend**: Deployed as static site using Vite + Render  

---

## 💡 Enhancements (Bonus Features)

- ✅ Modular folder structure  
- ✅ JWT token authentication  
- 🚧 Pagination & sorting (to be added)  
- 🚧 Swagger/OpenAPI docs (optional)  
- 🚧 Docker setup (optional)  

---

## 📌 Assumptions

- JWT token is stored in headers (`Authorization: Bearer <token>`)  
- Logout is handled client-side by removing token  
- Minimal frontend (React + Vite) for demonstration  

---

## 👨‍💻 Author

**Anurag Raj**  
[GitHub: @AnuragRaj11](https://github.com/AnuragRaj11)
```