const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.post('/', (req, res) => {
  // console.log('Inside Signup Post Request');
  // console.log('Req Body : ', req.body);
  const sql = `INSERT INTO bill_transaction (bill_id, user_id, owed_id, amount) VALUES (-1, ${req.body.user_id}, ${req.body.owed_id}, ${req.body.amount})`;

  pool.query(sql).then((rows) => {
    if (rows[0].affectedRows > 0) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'BALANCE_SETTLED' }));
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
