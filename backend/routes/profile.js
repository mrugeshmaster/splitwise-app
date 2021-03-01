const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.get('/', (req, res) => {
  const sql = `CALL Profile_Get('${req.body.user_id}');`;
  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result[0].length > 0) {
      const userObj = {
        user_id: result[0][0].user_id,
        email: result[0][0].email,
        name: result[0][0].name,
        phone: result[0][0].phone,
        currency: result[0][0].currency,
        language: result[0][0].language,
        timezone: result[0][0].timezone,
      };
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(userObj));
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

router.put('/', (req, res) => {
  const sql = `CALL Profile_Put('${req.body.user_id}', '${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.currency}', '${req.body.language}', '${req.body.timezone}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0 && result[0][0].flag) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'USER_UPDATED' }));
    } else {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'USER_NOT_FOUND' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
