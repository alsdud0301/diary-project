// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // 쿠키 삭제
        res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`);
        return res.status(200).json({ isSuccess: true, message: 'Logged out successfully' });
    } else {
        // POST 요청 외에는 허용하지 않음
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
