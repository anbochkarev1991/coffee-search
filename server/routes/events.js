import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const list = Event.find().sort({ date: -1 });
    return res.json({ list });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

export default router;
