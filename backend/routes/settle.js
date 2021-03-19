const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.post('/', (req, res) => {
  // console.log('Inside Signup Post Request');
  // console.log('Req Body : ', req.body);
  const sql = `CALL settle_up('${req.body.user_id}','${req.body.owedTo}','${req.body.settleAmount}')`;

  pool.query(sql).then((rows) => {
    console.log(rows[0][0][0].flag);
    if (rows[0][0][0].flag === 'BALANCE_SETTLED') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: rows[0][0][0].flag }));
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
