import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userID, password } = req.body;

        try {
            console.log(`Attempting login for userID: ${userID}`);

            // userID로 사용자 조회
            const user = await prisma.user.findUnique({
                where: { userID },
            });

            // 사용자가 없을 경우
            if (!user) {
                console.error(`User not found: ${userID}`);
                return res.status(401).json({ isSuccess: false, message: 'Invalid userID or password' });
            }

            console.log(`User found: ${user.userID}, comparing passwords...`);

            // 입력한 비밀번호와 해시된 비밀번호 비교
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                console.error(`Invalid password for user: ${userID}`);
                return res.status(401).json({ isSuccess: false, message: 'Invalid userID or password' });
            }

            console.log(`Password match for userID: ${userID}`);

            // JWT 토큰 생성
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

            console.log(`JWT token generated for userID: ${userID}`);

            // 쿠키 설정
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`);

            // 로그인 성공 응답
            return res.status(200).json({
                isSuccess: true,
                result: { jwt: token },
                user: { userID, password }
            });
        } catch (error: any) {
            // 예외 처리
            console.error('Error during login:', error);
            return res.status(500).json({ isSuccess: false, message: 'Internal server error' });
        }
    } else {
        // POST 요청 외에는 허용하지 않음
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
