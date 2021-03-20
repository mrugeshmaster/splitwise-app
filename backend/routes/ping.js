const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({ message: 'Pong' }));
});

module.exports = router;
