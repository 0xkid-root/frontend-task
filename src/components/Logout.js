import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    
      navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
