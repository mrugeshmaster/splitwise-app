const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const pool = require('../pool.js');

router.post('/', async (req, res) => {
  // console.log('Inside Signup Post Request');
  // console.log('Req Body : ', req.body);
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(req.body.password, salt);

  const sql = `CALL SIGNUP_Post('${req.body.name}', '${req.body.email}', '${encryptPassword}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0 && result[0][0].flag === 'NEW_USER_CREATED') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: result[0][0].flag }));
    } else if (result && result.length > 0 && result[0][0].flag === 'USER_ALREADY_EXISTS') {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: result[0][0].flag }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
