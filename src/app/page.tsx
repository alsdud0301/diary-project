'use client';
import styles from '../components/css/menubar.module.css'; // CSS Module import
import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Menubar from '@/components/menubar';

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const style = { textDecoration: 'none', color: 'black' };
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Menubar />
  );
};

export default Home;
