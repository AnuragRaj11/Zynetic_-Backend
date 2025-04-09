import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person
} from '@mui/icons-material';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('https://books-api-lslo.onrender.com/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        mt: 2
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          fontWeight: 600,
          letterSpacing: 0.5,
          mb: 4
        }}
      >
        Create Account
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mb: 2 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '.MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(157, 78, 221, 0.05)',
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '.MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(157, 78, 221, 0.05)',
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            mb: 3,
            '.MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(157, 78, 221, 0.05)',
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 4px 8px rgba(157, 78, 221, 0.3)'
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#c77dff', fontWeight: 600 }}>
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default Register; 