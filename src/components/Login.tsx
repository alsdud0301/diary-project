import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import style from "../components/css/login.module.css"
import Link from 'next/link';
const Login: React.FC = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(userID, password);
      console.log(userID,password)
      router.push('/');
    } catch (error) {
      console.error('Failed to login:', error);
      alert('로그인에 실패했습니다.');
    }
  };
 

  return (
    <>
    <header className={style.login_header}>
        <div className={style.logo}>
          <Link href="/home" className={style.link}>Diary</Link>
          </div>
      </header>
      
      <section className={style.login_section}>
        <div className={style.login_container}>
      <form onSubmit={handleLogin}>
      <div className={style.login_div}>
      <input
       className={style.userID_box}
        type="text"
        placeholder="아이디"
        value={userID}
        onChange={(e) => setUserID(e.target.value)} />
      </div>
      <div className={style.login_div2}>
      <input
        className={style.pwd_box}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
        </div>
      <button className={style.loginbtn} type="submit">로그인</button>
      <div className={style.link_div}>
      <Link href="/signup" className={style.signup_link}>회원가입</Link>
      <Link href="/fpassword" className={style.fpassword_link}>비밀번호 찾기</Link>
      <Link href="/fid" className={style.fid_link}>아이디 찾기</Link>
      </div>
    </form>
    </div>
    </section>
    </>
    
  );
};

export default Login;
