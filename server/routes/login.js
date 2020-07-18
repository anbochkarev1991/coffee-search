import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.get('/', async (reg, res) => {
  const { email, password } = req.body;
  try{
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    return res.end();
  }
  } catch (err) {
    res.json(err.message);
  }
})

export default router;
