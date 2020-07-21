import express from 'express';
import Cafe from '../models/cafe.js';
import Event from '../models/event.js';
import User from '../models/user.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const list = await Cafe.find().sort({ rating: -1 });
    return res.json({ list });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

router
  .route('/:id/events')
  .get(async (req, res) => {
    try {
      // console.log('>>>>>>>>REQ_PARAMS_ID: ', req.params.id)
      const eventCafe = await Event.find({ location: req.params.id })
      // console.log(eventCafe)
      return res.json({ eventCafe })
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const eventFromSite = req.body;
      // console.log('>>>>>>>>REQ_BODY: ', eventFromSite.title)

      const user = await User.findOne({ login: eventFromSite.author })
      // console.log('>>>>>>>user>>>>>>: ', user)

      const newEvent = new Event({
        title: eventFromSite.title,
        body: eventFromSite.body,
        author: user._id,
        location: req.params.id,
        date: eventFromSite.date,
      })
      await newEvent.save();
      // console.log('>>>>>>NEW_EVENT: ', eventCafe)
      res.json(newEvent);

    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const cafe = await Cafe.findById(id);
    return res.json({ cafe });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

router.post('/new', async (req, res) => {
  const { cafe } = req.body;
  try {
    const newCafe = new Cafe({
      latitude: cafe.latitude,
      longitude: cafe.longitude,
      address: cafe.address,
      name: cafe.name,
      rating: cafe.rating,
    });
    await newCafe.save();
    res.json(newCafe);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

export default router;
