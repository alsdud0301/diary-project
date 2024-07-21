require('dotenv').config(); // 환경 변수를 로드합니다.
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import express, { json } from 'express';
import session, { Store } from 'express-session';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import Sequelize from 'sequelize';
import connectSessionSequelize from 'connect-session-sequelize';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();

const server = express();

const SequelizeStore = connectSessionSequelize(Store);
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './session.sqlite',
});
const sessionStore = new SequelizeStore({
  db: sequelize,
});

server.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    },
  })
);

sessionStore.sync();

server.use(json());

server.post('/api/login', async (req, res) => {
  const { userID, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { userID },
    });

    if (!user) {
      return res.status(401).json({ isSuccess: false, message: 'Invalid userID or password' });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ isSuccess: false, message: 'Invalid userID or password' });
    }

    req.session.user = { id: user.id, userID: user.userID, email: user.email, name: user.name };

    return res.status(200).json({ isSuccess: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ isSuccess: false, message: 'Internal server error' });
  }
});

server.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ isSuccess: false, message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ isSuccess: true, message: 'Logout successful' });
  });
});

server.all('*', (req, res) => {
  const parsedUrl = parse(req.url, true);
  return handle(req, res, parsedUrl);
});

app.prepare()
  .then(() => {
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error('Error during app preparation:', ex.stack);
    process.exit(1);
  });
