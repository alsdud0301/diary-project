'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// User 인터페이스 정의
interface User {
  id: string;
  name: string;
  userID: string;
  password: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userID: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (userID: string, password: string) => {

    try {
      const response = await axios.post('/api/login', { userID, password});
     
      if (response.data.isSuccess) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // 로그인 상태를 로컬 스토리지에 저장
        localStorage.setItem('userID', JSON.stringify(userID)); // 로그인 상태를 로컬 스토리지에 저장
        router.push('/board');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  const logout = async () => {
    console.log('Attempting to logout...'); // 로그아웃 시도 로그
    try {
      await axios.post('/api/logout');
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('userID');
      localStorage.removeItem('login_token');
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUser(parsedUser);
          
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
