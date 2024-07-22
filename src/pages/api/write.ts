import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { diary_title,authorId,diary_content,userID,diary_date,selectedDate } = req.body;

    if(userID){
      res.status(200).json({diary_content,diary_title,userID,diary_date,selectedDate})
    }
    if (!userID) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const post = await prisma.diary.create({
        data: {
          diary_title,
          diary_content,
          published: false,
          authorId: userID,
        //  author: { connect: { userID} }, //이부분 수정
         diary_date:selectedDate
         
        },
      });
      res.status(200).json(post);
    } catch (error) {
      console.error('prisma error:', error);
      res.status(500).json({ error: 'prisma error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
