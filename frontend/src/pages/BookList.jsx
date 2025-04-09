import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Grid,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  SortRounded as SortIcon
} from '@mui/icons-material';
import axios from 'axios';

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Sorting
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Fetch books with pagination and sorting
  useEffect(() => {
    const fetchBooks = async () => {
      if (isSearching) return; // Skip if we're in search mode
      
      setLoading(true);
      setError('');
      
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        let url = `https://books-api-lslo.onrender.com/getbooks?page=${page}&limit=5`;
        
        if (sortField) {
          url += `&sortBy=${sortField}&order=${sortOrder}`;
        }
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setBooks(response.data.books);
        setTotalPages(response.data.pagination.totalPages);
      } catch (err) {
        setError('Failed to fetch books. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [navigate, page, sortField, sortOrder, isSearching]);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }
    
    setLoading(true);
    setError('');
    setIsSearching(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await axios.get(`https://books-api-lslo.onrender.com/searchbooks?title=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBooks(response.data);
      setTotalPages(1); // No pagination for search results in our API yet
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setIsSearching(false);
    }
  };
  
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const handleSortChange = (event) => {
    setSortField(event.target.value);
  };
  
  const handleOrderChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ 
          fontWeight: 700, 
          color: '#e0aaff', 
          mb: 1 
        }}>
          Book Collection
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'rgba(224, 170, 255, 0.7)', mb: 3 }}>
          Explore our curated selection of top books
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search books..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '.MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(157, 78, 221, 0.05)',
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            sx={{
              minWidth: '100px',
              borderRadius: 2,
              backgroundColor: 'var(--primary-color)',
              '&:hover': {
                backgroundColor: 'var(--secondary-color)',
              }
            }}
          >
            Search
          </Button>
        </Box>
        
        {isSearching && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Chip 
              label={`Results for: ${searchTerm}`} 
              onDelete={handleClearSearch}
              sx={{ 
                backgroundColor: 'rgba(157, 78, 221, 0.15)',
                color: '#e0aaff'
              }} 
            />
          </Box>
        )}
        
        {!isSearching && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControl sx={{ minWidth: 140, mr: 2 }}>
              <Select
                value={sortField}
                onChange={handleSortChange}
                displayEmpty
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(157, 78, 221, 0.1)', 
                  borderRadius: 2,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(157, 78, 221, 0.3)',
                  }
                }}
              >
                <MenuItem value="">
                  <em>Sort by</em>
                </MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
            
            {sortField && (
              <Chip 
                icon={<SortIcon />} 
                label={sortOrder === 'asc' ? 'Ascending' : 'Descending'} 
                variant="outlined"
                onClick={handleOrderChange}
                sx={{ 
                  borderColor: 'rgba(157, 78, 221, 0.3)',
                  backgroundColor: 'rgba(157, 78, 221, 0.1)',
                }}
              />
            )}
          </Box>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ my: 2 }}>
          {error}
        </Typography>
      ) : books.length === 0 ? (
        <Typography sx={{ my: 2, textAlign: 'center' }}>
          No books found.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item xs={12} key={book._id}>
                <Card 
                  onClick={() => handleBookClick(book._id)}
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    borderRadius: 4,
                    background: 'rgba(59, 9, 108, 0.4)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {book.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      by {book.author}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        label={book.category} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(157, 78, 221, 0.15)',
                          color: '#e0aaff'
                        }} 
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#9d4edd' }}>
                        ${book.price}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating 
                        value={book.rating} 
                        readOnly 
                        precision={0.5} 
                        size="small"
                        sx={{ 
                          mr: 1,
                          color: '#c77dff'
                        }}
                      />
                      <Typography variant="body2" sx={{ color: 'rgba(224, 170, 255, 0.7)' }}>
                        ({book.rating})
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {!isSearching && totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="secondary" 
                sx={{
                  '.MuiPaginationItem-root': {
                    color: '#e0aaff'
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BookList; 