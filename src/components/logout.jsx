import React from 'react';
import { useAppDispatch } from '../context/AppContext';

const LogoutButton = () => {
  const dispatch = useAppDispatch(); // Access the dispatch function

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' }); // Dispatch a logout action
    alert('You have been logged out!');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
