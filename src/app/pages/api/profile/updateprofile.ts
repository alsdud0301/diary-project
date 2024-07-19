import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id,userID,email, password } = req.body;

    if (!id) {
      res.status(400).json({ error: 'No id provided' });
      return;
    }

    try {
      const updatedProfile = await prisma.user.update({
        where: { userID: String(userID) },
        data: {
          email,
          password,
        },
      });
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
