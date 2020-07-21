import express from 'express';
import Cafe from '../models/cafe.js';
import Event from '../models/event.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const list = await Cafe.find();
    return res.json({ list });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

router.route('/:id/events').get(async (req, res) => {
  try {
    console.log('>>>>>>>>REQ_PARAMS_ID: ', req.params.id)
    const eventCafe = await Event.find({ location: req.params.id })
    console.log(eventCafe)
    return res.json({ eventCafe })
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
})

router.post('/new', async (req, res) => {
  const { cafe } = req.body;
  try {
  const newCafe = new Cafe({ 
    latitude: cafe.latitude,
    longitude: cafe.longitude,
    name: cafe.name,
    rating: cafe.rating
  });
  await newCafe.save();
  res.json(newCafe);
  } catch(err) {
    console.log(err);
    res.status(500).end();
  }
})

export default router;
