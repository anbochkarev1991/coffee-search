import {Router as router} from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

router.get('/', async (reg, res) => {
  const { email, password } = req.body;
  try{
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.json().end();
  }
  } catch (err) {
    res.json(err.message);
  }
})

export default router;
