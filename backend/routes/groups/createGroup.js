const express = require('express');

const router = express.Router();
const pool = require('../../pool.js');

router.post('/', (req, res) => {
  // console.log('Inside Create Group POST Request');
  const groupImage = req.body.group_image || 'groupPlaceholder.png';

  const sql = `CALL Group_Create('${req.body.user_id}', '${req.body.group_name}', '${groupImage}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 1 && result[0][0].flag === 'GROUP_CREATED') {
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
