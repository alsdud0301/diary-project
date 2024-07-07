import React, { useEffect, useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import styles from '../components/css/board.module.css'; // CSS 모듈 임포트
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";


const Board = () => {
    const style={color : 'black', textDecoration: 'none' }
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const router = useRouter();

    const handleWriteClick = () => {
        router.push('/write');
    };

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
                const userID = storedUser ? storedUser.userID : null;

                if (!userID) {
                   
                    setLoading(false);
                    alert("로그인을 해주세요!");
                    router.push("/login");
                    return;
                }

                const response = await axios.get('/api/diary', {
                    params: { userID }
                });

                setDiaries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching diaries:', error);
                setLoading(false);
            }
        };

        fetchDiaries();
    }, []);
    // const filterDiariesByMonth = (diaries. date) =>{
    //     return diaries.filter(diary => {
    //         const diaryDate = new Date(diary.diary_date);
    //         return diaryDate.getMonth() === date.getMonth() && diaryDate.getFullYear()=== date.getFullYear();

    //     });
    // };
    // const filteredDiaries = filterDiariesByMonth(diaries,selectedDate);
    

    if (loading) {
        return <div>Loading...</div>;
    }
  
    return (
        <AuthProvider>
            <section className={styles.diary_section}>
            <div className={styles.mydiary}>
                    <Image className={styles.image2} src="/assets/images/diary.png" alt="image" width={60} height={60}></Image>
                    <h2 className={styles.h2}>내 다이어리</h2>
                </div>
                {/* <div className="img_div">
                        <Image className={styles.image} src="/assets/images/pencil.png" alt={"image"} width={300} height={300}  priority/>
                    </div> */}
                <div className={styles.diary_container}>
                
                {diaries.map((diary) => (
                    <div key={diary.id} className={styles.diary_div}>
                        <Link style={style} href={`/board/${diary.id}`}>
                            {diary.diary_title}
                        </Link>
                    </div>
                ))}
               
                </div>
                <button className={styles.writebtn} onClick={handleWriteClick}>일기 쓰기</button>
            </section>
        </AuthProvider>
    );
};

export default Board;
