import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  return res.end();
});

export default router;
