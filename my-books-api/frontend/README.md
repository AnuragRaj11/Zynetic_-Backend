# Book Store Frontend

A modern, mobile-inspired React application for browsing and managing books.

## Features

- **Responsive Mobile-like UI**: Designed with a floating card interface that looks like a mobile app
- **Dark Violet Theme**: Beautiful dark theme with violet accent colors and glassmorphism effects
- **Authentication**: Complete login and registration flows with token-based auth
- **Book Management**: Browse, search, and view detailed book information
- **Filtering & Sorting**: Sort books by price or rating, filter by different criteria
- **Search**: Search books by title with real-time results
- **Pagination**: Navigate through book listings with pagination support

## Tech Stack

- **React 18+**: Modern React with functional components and hooks
- **Vite**: Next generation frontend tooling for fast development
- **React Router**: For navigation and routing between pages
- **Material UI**: Component library for consistent, beautiful UI elements
- **Axios**: HTTP client for API communication

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BottomNav.jsx  # Bottom navigation bar
│   │   └── Header.jsx     # App header with navigation controls
│   ├── pages/             # Page components
│   │   ├── BookDetails.jsx # Single book view
│   │   ├── BookList.jsx   # Main book listing page
│   │   ├── Login.jsx      # Login page
│   │   └── Register.jsx   # Registration page
│   ├── utils/             # Utility functions
│   │   └── api.js         # API integration utilities
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
└── index.html             # HTML template
```

## Setup & Running

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```
   
3. **Building for Production**
   ```bash
   npm run build
   ```

## API Integration

The frontend connects to a RESTful API backend running on port 4000 and includes:

- Authentication endpoints (login, register, logout)
- Book listing with pagination and sorting
- Book details retrieval
- Search functionality

## Design Features

- **Glassmorphism**: Transparent glass-like elements with backdrop blur
- **Responsive Layouts**: Adapts to different screen sizes
- **Subtle Animations**: Card hover effects and transitions
- **Consistent Styling**: Unified color scheme and component styling

## Screenshots

(Screenshots would be added here)

## Future Enhancements

- Book favoriting system
- User profile management
- More advanced filtering options
- Shopping cart functionality

## License

MIT
