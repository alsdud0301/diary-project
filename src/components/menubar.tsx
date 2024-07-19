import styles from '../components/css/menubar.module.css'; // CSS Module import
import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Menubar: React.FC= () => {
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
    return(
        <>
      <header className={styles.menubar_header}>
        <div className={styles.menubarDiv}>
          <div className={styles.logo}>
            <span className={styles.logoP}>Diary</span>
            <div className={styles.menubarDivUl}>
              <ul className={styles.menubarUl}>
              
                <li className={styles.menubarLi}>
                  <Link style={style} href="/board">내일기장</Link>
                </li>
                {/* <li className={styles.menubarLi}>
                  <Link style={style} href="/profile">내프로필</Link>
                </li> */}
                {user ? (
                  <li className={styles.menubarLi}>
                    <button className={styles.logoutbtn} onClick={handleLogout}>로그아웃</button>
                  </li>
                ) : (
                  <>
                    <li className={styles.menubarLi}>
                      <button className={styles.loginbtn} onClick={() => router.push('/login')}>로그인</button>
                    </li>
                    <li className={styles.menubarLi}>
                      <button className={styles.signupbtn} onClick={() => router.push('/signup')}>회원가입</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
    )
}
export default Menubar;