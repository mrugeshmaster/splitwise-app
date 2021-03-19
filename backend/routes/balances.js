/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const pool = require('../pool.js');

router.get('/:user_id', async (req, res) => {
  const getRestUsersSql = `select distinct gu2.user_id as checking_with_user from groups_users gu1 join groups_users gu2 on gu1.user_id <> gu2.user_id and gu1.group_id = gu2.group_id where gu1.user_id = ${req.params.user_id};`;
  const balancesSql = `CALL get_balances('${req.params.user_id}', ? )`;
  const balances = [];
  pool.query(getRestUsersSql)
    .then((rows) => {
      const promiseList = rows[0].map((row) => new Promise((resolve, reject) => pool.query(balancesSql, row.checking_with_user)
        .then((subRows) => {
          subRows[0][0].map((subRow) => {
            const balance = {
              user1: subRow.logged_in_user,
              user1_name: subRow.logged_in_user_name,
              user2: subRow.checking_with_user,
              user2_name: subRow.checking_with_user_name,
              net_amt: subRow.net_amt,
              collect_or_pay: subRow.collect_or_pay,
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
