import express from 'express';
import Cafe from '../models/cafe.js';
import Event from '../models/event.js';
import User from '../models/user.js';
import Menu from '../models/menu.js';
import Barista from '../models/barista.js';
import Comment from '../models/comment.js';

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
      const eventCafe = await Event.find({ location: req.params.id })
        .populate('author')
        .sort({ date: 1 });
      console.log(eventCafe);
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
      const exportEvent = await Event.find({ _id: newEvent._id }).populate('author')
      res.json(exportEvent);
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

router
  .route('/:id/menu')
  .get(async (req, res) => {
    try {
      const menu = await Menu.find({ location: req.params.id });
      return res.json({ menu });
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const itemFromSite = req.body;
      const cafe = await Cafe.findOne({ _id: req.params.id });
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
  });

router
  .route('/:id/barista')
  .get(async (req, res) => {
    try {
      console.log('>>>>>Barists REQ PARAMS: ', req.params.id)
      const barista = await Barista.find({ location: req.params.id })
      console.log('>>>>>BACKEND BARISTAS: ', barista)
      return res.json({ barista })
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })

  router
  .route('/:id/comments')
  .get(async (req, res) => {
    try {
      const comments = await Comment.find({ cafe: req.params.id })
        .populate('author')
        .sort({ date: -1 });
      return res.json({ comments });
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const itemFromSite = req.body;
      const user = await User.findOne({ login: req.body.login })
      // const cafe = await Cafe.findOne({ _id: req.params.id })
      const newItem = new Comment({
        title : req.body.title,
        body: req.body.body,
        author: user._id,
        cafe: req.params.id,
      });
      await newItem.save();
      const exportComment = await Comment.find({ _id: newItem._id }).populate('author')
      res.json(exportComment);
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.body.id });
      res.end();
    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  });

export default router;
