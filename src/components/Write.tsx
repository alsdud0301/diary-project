import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Mycalendar from './MonthPicker';
import '../components/css/write.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const router = useRouter();
  
  const handleEditorChange = (content: string) => {
    setContent(content);
  };
  
  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!storedUser || !storedUser.userID) {
      alert('User not found');
      return;
    }

    const userID = storedUser.userID;
    try {
      const response = await axios.post('/api/write', {
        diary_title: title,
        diary_content: content,
        userID,
        selectedDate
      });
      router.push('/board');
      console.log('Post created:', response.data);
     
    } catch (error) {
      console.error('Failed to create post:', error);
      console.error(storedUser);
    }
  };
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
        </div>
        <div className='calendar'>
          <Mycalendar selectedDate={selectedDate} onChange={handleDateChange} />
        </div>
        <ReactQuill
          className='quill'
          theme="snow"
          value={content}
          onChange={handleEditorChange}
        />
        <div className='btn_div'>
          <button className="writebtn" onClick={handleSubmit}>쓰기 완료!</button>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
