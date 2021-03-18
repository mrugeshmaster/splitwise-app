const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.post('/', (req, res) => {
  console.log('Inside Add Bill Post Request');
  console.log('Req Body : ', req.body);
  const sql = `CALL add_bill('${req.body.group_name}', '${req.body.bill_name}', '${req.body.bill_paid_by}', '${req.body.bill_amount}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0 && result[0][0].flag === 'BILL_ADDED') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: result[0][0].flag }));
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
