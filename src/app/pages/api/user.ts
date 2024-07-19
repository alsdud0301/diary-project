import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userID, password, email, name } = req.body;

        try {
            // 비밀번호 해싱
            const hashedPassword = await bcrypt.hash(password, 10);

            // 사용자 생성
            const user = await prisma.user.create({
                data: {
                    userID,
                    password: hashedPassword,
                    email,
                    name,
                    

                },
            });

            // 사용자 생성 성공 응답
            return res.status(201).json({ isSuccess: true, message: 'User registered successfully', user });
        } catch (error: any) {
            console.error('Error registering user:', error);
            return res.status(500).json({ isSuccess: false, message: error.message });
        } finally {
            // Prisma Client 연결 종료
            await prisma.$disconnect();
        }
    } else {
        // POST 요청 외에는 허용하지 않음
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
