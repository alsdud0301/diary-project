'use client';
import styles from '../components/css/menubar.module.css'; // CSS Module import
import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Login from "@/components/Login"

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const style = { textDecoration: 'none', color: 'black' };
  const { user, logout } = useAuth();
  const router = useRouter();


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Login />
  );
};

export default Home;
