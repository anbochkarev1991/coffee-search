import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('user_sid');
      res.end();
    });
  } else {
    res.end();
  }
})

export default router;
