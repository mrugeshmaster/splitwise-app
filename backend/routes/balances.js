/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.get('/', async (req, res) => {
  const getRestUsersSql = `select distinct gu2.user_id as owed_id from groups_users gu1 join groups_users gu2 on gu1.user_id <> gu2.user_id and gu1.group_id = gu2.group_id where gu1.user_id = ${req.body.user_id};`;
  const balancesSql = `select collect_amount-owed_amount as net_amount from (select ifnull(sum(amount),0) as collect_amount from bill_transaction where user_id=${req.body.user_id} and owed_id=?) as s1 join (select ifnull(sum(amount),0) as owed_amount from bill_transaction where user_id=? and owed_id=${req.body.user_id}) as s2;`;
  const balances = [];
  pool.query(getRestUsersSql)
    .then((rows) => {
      const promiseList = rows[0].map((row) => new Promise((resolve, reject) => pool.query(balancesSql, [row.owed_id, row.owed_id])
        .then((subRows) => {
          subRows[0].map((subRow) => {
            // console.log(row.owed_id);
            const balance = {
              user1: req.body.user_id,
              user2: row.owed_id,
              net_amt: subRow.net_amount,
            };
            balances.push(balance);
          });

          resolve(balances);
        }, (err) => {
          reject(err);
        })));
      Promise.all(promiseList).then((result) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: balances }));
      }).catch((err) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: err }));
      });
    });
});

module.exports = router;
