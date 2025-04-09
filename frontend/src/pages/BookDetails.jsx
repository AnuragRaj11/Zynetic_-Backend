import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Rating,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Paper
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError('');
      
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await axios.get(`https://books-api-lslo.onrender.com/getbook/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setBook(response.data);
        
        // Simulate checking if book is in favorites
        const randomFavorite = Math.random() > 0.5;
        setIsFavorite(randomFavorite);
      } catch (err) {
        setError('Failed to fetch book details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookDetails();
  }, [id, navigate]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would make an API call here to add/remove from favorites
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ my: 2 }}>
        {error}
      </Typography>
    );
  }

  if (!book) {
    return (
      <Typography sx={{ my: 2, textAlign: 'center' }}>
        Book not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ pb: 2 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 4, 
          mb: 3,
          background: 'rgba(59, 9, 108, 0.4)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#e0aaff' }}>
            {book.title}
          </Typography>
          
          <Button 
            variant="text" 
            color="secondary"
            onClick={toggleFavorite}
            sx={{ minWidth: 32, p: 0.5 }}
          >
            {isFavorite ? 
              <BookmarkIcon sx={{ fontSize: 28 }} /> : 
              <BookmarkBorderIcon sx={{ fontSize: 28 }} />
            }
          </Button>
        </Box>
        
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'rgba(224, 170, 255, 0.8)' }}>
          by {book.author}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Rating 
            value={book.rating} 
            readOnly 
            precision={0.5}
            sx={{ color: '#c77dff', mr: 1 }} 
          />
          <Typography variant="body2" sx={{ color: 'rgba(224, 170, 255, 0.7)' }}>
            ({book.rating})
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#9d4edd' }}>
            ${book.price}
          </Typography>
          
          <Chip 
            icon={<CategoryIcon />}
            label={book.category} 
            sx={{ 
              backgroundColor: 'rgba(157, 78, 221, 0.15)',
              color: '#e0aaff',
              fontWeight: 500
            }} 
          />
        </Box>
      </Paper>
      
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 4,
          background: 'rgba(59, 9, 108, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarIcon sx={{ color: 'rgba(224, 170, 255, 0.7)', mr: 1 }} />
          <Typography variant="body2" sx={{ color: 'rgba(224, 170, 255, 0.7)' }}>
            Published on {formatDate(book.publishedDate)}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(224, 170, 255, 0.1)' }} />
        
        <Typography variant="h6" sx={{ mb: 1, color: '#e0aaff', fontWeight: 600 }}>
          About this book
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'rgba(224, 170, 255, 0.8)', lineHeight: 1.6 }}>
          This is a placeholder description for the book titled "{book.title}" by {book.author}. 
          In a real application, this would contain a detailed description of the book's content, 
          themes, and other relevant information to help readers decide if they want to purchase it.
        </Typography>
        
        <Button
          variant="contained"
          fullWidth
          sx={{ 
            mt: 3,
            p: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 4px 8px rgba(157, 78, 221, 0.3)'
          }}
        >
          Add to Cart
        </Button>
      </Paper>
    </Box>
  );
};

export default BookDetails; 