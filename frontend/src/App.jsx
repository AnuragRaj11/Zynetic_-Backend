import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import BookList from './pages/BookList'
import BookDetails from './pages/BookDetails'

// Components
import Header from './components/Header'
import BottomNav from './components/BottomNav'

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9d4edd',
    },
    secondary: {
      main: '#c77dff',
    },
    background: {
      default: '#10002b',
      paper: '#240046',
    },
    text: {
      primary: '#e0aaff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false)
  
  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
  }
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          
          <div className="content">
            <Routes>
              <Route 
                path="/" 
                element={isLoggedIn ? <BookList /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/login" 
                element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/register" 
                element={!isLoggedIn ? <Register /> : <Navigate to="/" />} 
              />
              <Route 
                path="/book/:id" 
                element={isLoggedIn ? <BookDetails /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
          
          {isLoggedIn && <BottomNav />}
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
