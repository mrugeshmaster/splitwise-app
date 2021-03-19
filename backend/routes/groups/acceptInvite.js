const express = require('express');

const router = express.Router();
const pool = require('../../pool.js');

router.post('/accept', (req, res) => {
  console.log('Inside Accept Invite POST Request');
  console.log(req.body);
  const sql = `CALL Group_Member_Invite_Accept('${req.body.user_id}', '${req.body.group_name}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    console.log(result);
    if (result && result.length > 1 && result[0][0].flag === 'INVITE_ACCEPTED') {
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

router.post('/reject', (req, res) => {
  console.log('Inside reject Invite POST Request');
  console.log(req.body);
  const sql = `CALL Group_Member_Invite_Reject('${req.body.user_id}', '${req.body.group_name}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    console.log(result);
    if (result && result.length > 1 && result[0][0].flag === 'INVITE_REJECTED') {
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
