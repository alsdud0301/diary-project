import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userID } = req.query;

    if (!userID) {
      res.status(400).json({ error: 'No userID provided' });
      return;
    }

    try {
      const profile = await prisma.user.findMany({
        where: { userID: String(userID) },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });

      if (profile.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
