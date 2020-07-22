import express from 'express';
import Cafe from '../models/cafe.js';
import Event from '../models/event.js';
import User from '../models/user.js';
import Menu from '../models/menu.js';


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
      const eventCafe = await Event.find({ location: req.params.id }).populate('author').sort({ 'date': 1 });
      console.log(eventCafe)
      return res.json({ eventCafe })
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const eventFromSite = req.body;
      const user = await User.findOne({ login: eventFromSite.author })
      const newEvent = new Event({
        title: eventFromSite.title,
        body: eventFromSite.body,
        author: user._id,
        location: req.params.id,
        date: eventFromSite.date,
      })
      await newEvent.save();
      res.json(newEvent);
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Event.deleteOne({ _id: req.body.id });
      res.end();
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

router
  .route('/:id/menu')
  .get(async (req, res) => {
    try {
      const menu = await Menu.find({ location: req.params.id })
      return res.json({ menu })
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const itemFromSite = req.body;
      const cafe = await Cafe.findOne({ _id: req.params.id })
      const newItem = new Menu({
        goods: itemFromSite.goods,
        cost: itemFromSite.cost,
        size: itemFromSite.size,
        location: req.params.id,
      });
      await newItem.save();
      res.json(newItem);
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Menu.deleteOne({ _id: req.body.id });
      res.end();
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })

export default router;
