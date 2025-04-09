import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem,
  Box
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ArrowBack as ArrowBackIcon,
  Logout as LogoutIcon,
  AccountCircle
} from '@mui/icons-material';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Determine if we need a back button based on current location
  const showBackButton = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';
  
  // Set title based on current route
  let title = 'Book App';
  if (location.pathname === '/login') title = 'Sign In';
  if (location.pathname === '/register') title = 'Create Account';
  if (location.pathname.startsWith('/book/')) title = 'Book Details';
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleClose();
    onLogout();
    navigate('/login');
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static" sx={{ 
      borderRadius: '24px 24px 0 0',
      background: 'rgba(59, 9, 108, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <Toolbar sx={{ minHeight: '60px', px: 2 }}>
        {showBackButton ? (
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} /> // Spacer when no back button
        )}
        
        <Typography variant="h6" component="div" sx={{ 
          flexGrow: 1, 
          textAlign: 'center',
          fontWeight: 600
        }}>
          {title}
        </Typography>
        
        {isLoggedIn && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  backgroundColor: 'rgba(59, 9, 108, 0.95)',
                  backdropFilter: 'blur(10px)',
                }
              }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 