// // pages/api/express.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import next from 'next';
// import express from 'express';
// import session from 'express-session';
// import { Sequelize } from 'sequelize';
// import connectSessionSequelize from 'connect-session-sequelize';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const dev = process.env.NODE_ENV !== 'production';
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();

// const app = express();
// const SequelizeStore = connectSessionSequelize(session.Store);

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './session.sqlite',
// }); 

// const sessionStore = new SequelizeStore({
//   db: sequelize,
// });

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'your_secret_key',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60, // 1 hour
//       secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//     },
//   })
// );

// sessionStore.sync();

// app.use(express.json());

// app.post('/api/login', async (req, res) => {
//   const { userID, password } = req.body;
//   const prisma = new PrismaClient();

//   // User 인증 로직
//   try {
//     // userID로 사용자 조회
//     const user = await prisma.user.findUnique({
//       where: { userID },
//     });

//     if (!user) {
//       return res.status(401).json({ isSuccess: false, message: 'Invalid userID or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
 
//     if (!passwordMatch) { 
//       return res.status(401).json({ isSuccess: false, message: 'Invalid userID or password' });
//     }

//     // 세션에 사용자 정보 저장
//     req.session.user = { id: user.id, userID: user.userID, email: user.email, name: user.name };

//     return res.status(200).json({ isSuccess: true, message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.status(500).json({ isSuccess: false, message: 'Internal server error' });
//   }
// });

// app.post('/api/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ isSuccess: false, message: 'Failed to log out' });
//     }
//     res.clearCookie('connect.sid');
//     return res.status(200).json({ isSuccess: true, message: 'Logout successful' });
//   });
// });

// app.all('*', (req, res) => {
//   return handle(req, res);
// });
 
// nextApp.prepare().then(() => {
//   app.listen(3000, (err?:any) => { 
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });
