const express = require('express');

const router = express.Router();
const pool = require('../../pool.js');

router.post('/', (req, res) => {
  console.log('Inside Group Invite Member POST Request');
  console.log(req.body);
  const sql = `CALL Group_Member_Invite('${req.body.invitationEmail}', '${req.body.groupName}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 1 && result[0][0].flag === 'MEMBER_INVITED') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: result[0][0].flag }));
    } else {
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
