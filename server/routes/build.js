import express from 'express';
import fs from 'fs';

const router = express.Router();

function deploy() {
  try {
    const indexPage = fs.readFileSync('../../client/build/index.html');
    router.get('*', async (req, res) => {
      res.send(indexPage);
    })
  } catch (err) {
    console.log(err);
  }
}

export default router;
