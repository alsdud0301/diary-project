import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userID } = req.query;

    if (!userID) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    try {
      const diarys = await prisma.diary.findMany({
        where: { authorId: String(userID) },
        select: {
          id: true,
          diary_title: true,
          diary_content: true,
          diary_date: true,
        },
      });
      const diary = diarys.map(diary => ({
        ...diary,
        diary_date: diary.diary_date.toString(),
        
      }));
      res.status(200).json(diarys);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
