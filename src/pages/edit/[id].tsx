import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../../components/css/write.css';
import 'react-quill/dist/quill.snow.css';
import { PrismaClient } from '@prisma/client';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const MyCalendar = dynamic(() => import('../../components/Calendar'), { ssr: false });

interface Diary{
  diary: {
  id: number;
  diary_title: string;
  diary_content: string;
  diary_date: string;
}

}
const EditPage : React.FC<Diary> = ({ diary }) => {
  const [title, setTitle] = useState(diary.diary_title);
  const [content, setContent] = useState(diary.diary_content);
  const [selectedDate, setSelectedDate] = useState(new Date(diary.diary_date));
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/diary/${id}`, {
        diary_title: title,
        diary_content: content,
        diary_date: selectedDate.toISOString(),
      });
      router.push(`/board/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='write_section'>
      <div className='write_div'>
        <div className='diary_info'>
          <input
            className='diary_title'
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <MyCalendar selectedDate={selectedDate} onChange={handleDateChange} />
        </div>
        <ReactQuill
          className='quill'
          theme="snow"
          value={content}
          onChange={handleEditorChange}
        />
        <button className="writebtn" onClick={handleSubmit}>수정 완료!</button>
      </div>
    </section>
  );
};

export const getServerSideProps = async (context: { params: { id: any; }; }) => {
  const { id } = context.params;
  const prisma = new PrismaClient();
  const diary = await prisma.diary.findUnique({
    where: { id: Number(id) },
  });

  if (!diary) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      diary: {
        ...diary,
        diary_date: diary.diary_date.toString(),
      },
    },
  };
};

export default EditPage;
