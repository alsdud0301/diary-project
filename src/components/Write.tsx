import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Mycalendar from './Calendar';
import '../components/css/write.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const router = useRouter();
  const handleEditorChange = (content: string) => {
    setContent(content);
  };
  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!storedUser.userID) {
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
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
    <Mycalendar onChange={handleDateChange} value={selectedDate} />
    </div>
      <ReactQuill
      className='quill'
        theme="snow"
        value={content}
        onChange={handleEditorChange}
      />
     

      <button className="writebtn" onClick={handleSubmit}>쓰기 완료!</button>
    </div>
    </section>
  );
};

export default CreatePost;
