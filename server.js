const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//CORS 설정 추가
app.use(cors());

//예시: 사용자 생성 엔드포인트
app.post('/api/user', async (req, res) => {
  const { name, userID, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        userID,
        email,
        password
      }
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});
// app.post("/api/user", (req, res) => {
//   console.log(req);
//   res.status(200).json({ success: true });
// }); 

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
