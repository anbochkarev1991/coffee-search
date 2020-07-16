import { Router as router } from 'express';

router.route('/').get((req, res) => {
  return res.end();
});

export default router;
