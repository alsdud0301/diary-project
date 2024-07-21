import React, { useEffect, useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import styles from '../components/css/board.module.css';
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import MonthPicker from "@/components/Calendar";

interface Diary {
  id: number;
  diary_title: string;
  diary_content: string;
  diary_date: string;
}

const Board = () => {
  const style = { color: 'black', textDecoration: 'none' };
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  const handleWriteClick = () => {
    router.push('/write');
  };

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

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/diary`, {
        params: { userID }
      });

      setDiaries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching diaries:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; 
  };

  const formatYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear(); 
  };

  const filteredDiaries = diaries.filter((diary) => {
    const diaryMonth = formatMonth(diary.diary_date);
    const diaryYear = formatYear(diary.diary_date);
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();
    return diaryMonth === selectedMonth && diaryYear === selectedYear;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <section className={styles.diary_section}>
        <div className={styles.mydiary}>
          <Image className={styles.image2} src="/assets/images/diary.png" alt="image" width={60} height={60} />
          <h2 className={styles.h2}>내 다이어리</h2>
          
        </div>
        <div className={styles.date}>
          <MonthPicker selectedDate={selectedDate} onChange={date => setSelectedDate(date)} />
          </div>
      
        <div className={styles.diary_container}>
          {filteredDiaries.map((diary) => (
            <div key={diary.id} className={styles.diary_div}>
              <Link style={style} href={`/board/${diary.id}`}>
                {diary.diary_title}
              </Link>
              <p className={styles.diary_date}>{`${formatYear(diary.diary_date)}년 ${formatMonth(diary.diary_date)}월`}</p>
            </div>
          ))}
        </div>
        <div className={styles.write_btn_div}>
        <button className={styles.writebtn} onClick={handleWriteClick}>일기 쓰기</button>
        </div>
      </section>
    </AuthProvider>
  );
};

export default Board;
