// pages/board/[id].tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import '../../components/css/diary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import prisma from '../../lib/prisma'
interface DiaryProps {
  diary: {
    id: number;
    diary_title: string;
    diary_content: string;
    diary_date: string;
  };
}

const Diary = ({ diary }: DiaryProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!diary) {
    return <div>Post not found</div>;
  }

  const editClick = () => {
    router.push(`/edit/${diary.id}`);
  };

  const listClick = () => {
    router.push(`/board`);
  };

  return (
    <>
      <nav className='diary_nav'>
        <button className='listbtn' onClick={listClick}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#000000" }} /> 목록
        </button>
      </nav>
      <section className='diary_section'>
        <div className='title_container'>
          <div className='title'>
            <span>{diary.diary_title}</span>
          </div>
        </div>
        <div className='diary_content'>
          <button className='edit_btn' onClick={editClick}>수정하기</button>
          <div className="content_div" dangerouslySetInnerHTML={{ __html: diary.diary_content }} />
          <p>날짜: {new Date(diary.diary_date).toLocaleString()}</p>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }; // 여기서 명시적으로 타입 캐스팅
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

export default Diary;
