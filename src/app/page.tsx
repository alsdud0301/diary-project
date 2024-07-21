'use client'
import React, { useEffect } from 'react';
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
