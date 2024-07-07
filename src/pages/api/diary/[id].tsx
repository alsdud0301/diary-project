// src/pages/api/diary/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const diary = await prisma.diary.findUnique({
        where: { id: Number(id) },
      });
      if (!diary) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(diary);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    const { diary_title, diary_content,diary_date } = req.body;
    try {
      const updatedDiary = await prisma.diary.update({
        where: { id: Number(id) },
        data: {
          diary_title,
          diary_content,
          diary_date,
        },
      });
      res.status(200).json(updatedDiary);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
