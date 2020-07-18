import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const saltRounds = 10;

router.post('/', async (req, res) => {
  try {
  const { login, email, password, birthday } = req.body;
  const newUser = new User({ login, email,
     password: await bcrypt.hash(password, saltRounds),
     birthday });
  await newUser.save();
  return res.end();
  } catch(err) {
    res.json(err.message);
  }
});

export default router;
