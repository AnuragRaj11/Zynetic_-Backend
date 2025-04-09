import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper 
} from '@mui/material';
import { 
  Home as HomeIcon,
  Bookmark as BookmarkIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  
  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setValue(0);
    else if (path === '/favorites') setValue(1);
    else if (path === '/profile') setValue(2);
  }, [location.pathname]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
    // Navigate based on selected tab
    switch(newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/favorites');
        break;
      case 2:
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  };
  
  return (
    <Paper 
      sx={{ 
        position: 'static', 
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '0 0 24px 24px',
        background: 'rgba(59, 9, 108, 0.95)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden'
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{ 
          background: 'transparent',
          height: 65
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<HomeIcon />} 
          sx={{ color: value === 0 ? '#e0aaff' : 'rgba(224, 170, 255, 0.6)' }}
        />
        <BottomNavigationAction 
          label="Favorites" 
          icon={<BookmarkIcon />}
          sx={{ color: value === 1 ? '#e0aaff' : 'rgba(224, 170, 255, 0.6)' }}
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<PersonIcon />}
          sx={{ color: value === 2 ? '#e0aaff' : 'rgba(224, 170, 255, 0.6)' }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav; 