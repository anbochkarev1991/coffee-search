import express from 'express';
import Cafe from '../models/cafe.js';
import Event from '../models/event.js';
import User from '../models/user.js';

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
      // console.log('>>>>>>>>REQ_PARAMS_ID: ', req.params.id)
      // console.log('>>>>>>>>REQ_BODY_BEFORTE: ', req.body)
      const eventFromSite = req.body;
      // console.log('>>>>>>>>REQ_BODY: ', eventFromSite.title)

      const user = await User.find({ login: eventFromSite.author })
      // console.log('>>>>>>>user>>>>>>: ', user)

      const newEvent = new Event({
        title: eventFromSite.title,
        body: eventFromSite.body,
        author: user._id,
        location: req.params.id,
        date: eventFromSite.date,
      })
      await newEvent.save();
      res.json({ eventCafe });
      res.end()

    } catch (error) {
      console.log(error.message);
      return res.json({ error: error.message });
    }
  })

export default router;
