'use client'
import React, { useEffect } from 'react';
import Login from "@/components/Login"
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const route = useRouter()
 
    useEffect(()=>{
      route.replace('/login')
    },[])
    // <AuthProvider>
    // <Login />
    // </AuthProvider>
    return null
  
}

export default Home
