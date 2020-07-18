import { Router as router } from 'express';
import Cafe from '../models/cafe.js';

router.route('/').get(async (req, res) => {
  try {
    const list = await Cafe.find();
    return res.json({ list });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

export default router;
