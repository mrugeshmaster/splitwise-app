const express = require('express');

const router = express.Router();
const pool = require('../../pool.js');

router.get('/user_id/:user_id/group_name/:group_name', (req, res) => {
  console.log('Inside Group Details');
  console.log(req.params);
  const sql = `CALL Get_Group_Details('${req.params.user_id}', '${req.params.group_name}');`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result[0]));
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
