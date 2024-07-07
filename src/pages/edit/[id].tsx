import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../../components/css/write.css';
import 'react-quill/dist/quill.snow.css';
import { PrismaClient } from '@prisma/client';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const MyCalendar = dynamic(() => import('../../components/Calendar'), { ssr: false });

const EditPage = ({ diary }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/diary/${id}`);
          const { diary_title, diary_content, diary_date } = response.data;
          setTitle(diary_title);
          setContent(diary_content);
          setSelectedDate(new Date(diary_date));
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/diary/${id}`, {
        diary_title: title,
        diary_content: content,
        diary_date: selectedDate.toISOString(),
      });
      router.push(`/board/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <MyCalendar onChange={handleDateChange} value={selectedDate} />
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

export const getServerSideProps = async (context) => {
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
