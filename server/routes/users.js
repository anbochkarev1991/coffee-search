import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.route('/').patch(async (req, res) => {
  const { user } = req.body;

  try {
    await User.findByIdAndUpdate(user._id, {
      $set: { login: user.login, email: user.email, favorites: user.favorites },
    });
    user = User.findById(user._id).populate('favorites');
    console.log(user);
    return res.json({ user });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

router.route('/:id/favs').get(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('favorites');
    const favs = user.favorites;
    return res.json({ favs });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

export default router;
