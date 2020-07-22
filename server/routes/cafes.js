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
      const eventCafe = await Event.find({ location: req.params.id });
      return res.json({ eventCafe });
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const eventFromSite = req.body;
      const user = await User.findOne({ login: eventFromSite.author });

      const newEvent = new Event({
        title: eventFromSite.title,
        body: eventFromSite.body,
        author: user._id,
        location: req.params.id,
        date: eventFromSite.date,
      });
      await newEvent.save();
      res.json(newEvent);
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  });

// Add rate
router.route('/:id/rate').patch(async (req, res) => {
  const { id } = req.params;
  const { value, user } = req.body;
  const rate = { user, value };

  if (!user) {
    return res.json({ error: 'Please log in to vote' });
  }

  try {
    const cafe = await Cafe.findById(id);
    const currentVote = cafe.rating.find((elem) => elem.user === user);

    if (currentVote) {
      currentVote.value = value;
    } else {
      cafe.rating.push(rate);
    }

    cafe.markModified('rating');
    await cafe.save();
    return res.json({ cafe });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

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
