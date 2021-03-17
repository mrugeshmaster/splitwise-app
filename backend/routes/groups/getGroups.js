const express = require('express');

const router = express.Router();
const pool = require('../../pool.js');

router.get('/:user_id', (req, res) => {
  console.log('Inside Group Get Request');
  // console.log('Req Body : ', req.body);
  const sql = `CALL Group_Get('${req.params.user_id}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0) {
      // const invitationsObj = []
      // console.log(result);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result[0]));
    } else {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'NO_GROUPS' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

router.get('/grouplist/:user_id', (req, res) => {
  console.log('Inside Group Get Request');
  // console.log('Req Body : ', req.body);
  const sql = `CALL Group_List_Get('${req.params.user_id}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0) {
      // const invitationsObj = []
      // console.log(result);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result[0]));
    } else {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'NO_GROUPS' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
