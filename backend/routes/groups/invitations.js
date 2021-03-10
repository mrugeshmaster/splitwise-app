const express = require('express');

const router = express.Router();
const pool = require('../../pool.js');

router.get('/', (req, res) => {
  // console.log('Inside Login Post Request');
  // console.log('Req Body : ', req.body);
  const sql = `CALL Group_Member_Invite_Display('${req.body.user_id}');`;

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
      res.end(JSON.stringify({ message: 'NO_INVITATIONS' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
