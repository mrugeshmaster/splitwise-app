const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const pool = require('../pool.js');

router.post('/', (req, res) => {
  const sql = `CALL Login_Get('${req.body.email}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0 && result[0][0].flag === 1) {
      const isMatch = bcrypt.compare(req.body.password, result[0][0].student_password);
      console.log(`isMatch : ${isMatch}`);
      if (isMatch) {
        res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
        req.session.user = req.body.email;
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
        res.end(JSON.stringify({ message: 'INCORRECT_PASSWORD' }));
      }
    } else {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'USER_DOES_NOT_EXISTS' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
