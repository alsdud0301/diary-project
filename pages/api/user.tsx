// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, userID, email, password } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          userID,
          email,
          password
        }
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
