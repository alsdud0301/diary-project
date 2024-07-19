import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Menubar from '../components/menubar';
import '../components/css/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showMenubar = ['/','/profile','/home','/board','/write','/diary','/board/[id]'];
   
  return (
    <AuthProvider>
        {showMenubar.includes(router.pathname) && <Menubar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
