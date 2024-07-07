'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';

const AuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AuthProviderWrapper;
