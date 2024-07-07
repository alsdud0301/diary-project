'use client'
import React from 'react';
import { useAuth } from '../context/AuthContext';

const TestAuth = () => {
  const { user, login, logout } = useAuth();

  React.useEffect(() => {
    console.log('TestAuth component mounted');
    console.log('Current user:', user);
  }, [user]);

  const handleLogin = () => {
    console.log('Login button clicked');
    login('suga', 'suga1234');
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout();
  };

  return (
    <div>
      <h1>Test Auth Component</h1>
      <button onClick={handleLogin}>Test Login</button>
      <button onClick={handleLogout}>Test Logout</button>
    </div>
  );
};

export default TestAuth;
