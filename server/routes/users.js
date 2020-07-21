import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.route('/').patch(async (req, res) => {
  const { user } = req.body;

  try {
    await User.findByIdAndUpdate(user._id, {
      $set: { login: user.login, email: user.email, favorites: user.favorites },
    });
    return res.json({ user });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

export default router;
