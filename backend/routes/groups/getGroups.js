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
  console.log('Inside Group List Get Request');
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

router.get('/groupbalances/:group_name', (req, res) => {
  console.log('Inside Group Balances Get Request');
  // console.log('Req Body : ', req.body);
  const sql = `SELECT 
  bt.user_id, 
  MAX(CASE WHEN bt.user_id=u.user_id THEN u.name END) AS user1,
  bt.owed_id, 
  MAX(CASE WHEN bt.owed_id=u.user_id THEN u.name END) AS user2,
  g.group_id, 
  bt.amount, 
  bt.settled,
  bt.bill_id 
FROM bill_transaction bt
JOIN bills b ON bt.bill_id=b.bill_id
JOIN groups g ON b.group_id = g.group_id
JOIN users u
WHERE g.group_name = '${req.params.group_name}'
GROUP BY
  bt.user_id, 
  bt.owed_id, 
  g.group_id, 
  bt.amount, 
  bt.settled,
  bt.bill_id;`;

  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result.length > 0) {
      // const invitationsObj = []
      // console.log(result);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(401, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'NO_BILLS' }));
    }
  }).catch((err) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: err }));
  });
});

module.exports = router;
