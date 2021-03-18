const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.get('/:user_id', (req, res) => {
  const sql = `CALL Get_Recent_Activity('${req.params.user_id}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result[0]));
    } else {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
