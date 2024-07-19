import React from 'react';
import Login from "./components/Login"
import { AuthProvider } from './context/AuthContext';
export const dynamic = "force-dynamic";
const Home: React.FC = () => {

  return (
    <AuthProvider>
    <Login />
    </AuthProvider>
  );
};

export default Home;
