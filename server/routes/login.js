import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.post('/', async (req, res) => {
  const { login, password } = req.body;
  try{
  const user = await User.findOne({ login: login });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    return res.end();
  } else {
    res.status(401).end()
  }
  } catch (err) {
    res.json(err.message);
  }
})

export default router;
