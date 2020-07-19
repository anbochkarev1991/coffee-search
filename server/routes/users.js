import express from 'express';

const router = express.Router();

router.route('/').patch(async (req, res) => {
  return res.json({});
});

export default router;
