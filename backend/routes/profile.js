const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
// const fs = require('fs');
const pool = require('../pool.js');

const imageStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/storage/users`,
  filename: (req, file, callback) => {
    callback(null, `user${req.body.user_id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: imageStorage,
  limits: { filesize: 1000000 },
}).single('avatar');

router.get('/:userId', (req, res) => {
  console.log('Inside Profile get request');
  const sql = `CALL Profile_Get('${req.params.userId}');`;
  pool.query(sql).then((rows) => {
    const result = rows[0];
    if (result && result[0].length > 0) {
      const userObj = {
        userId: result[0][0].user_id,
        email: result[0][0].email,
        name: result[0][0].name,
        phone: result[0][0].phone,
        currency: result[0][0].currency,
        language: result[0][0].language,
        timezone: result[0][0].timezone,
        image: result[0][0].image,
      };
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(userObj));
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

router.put('/', (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      const sql = `CALL Profile_Put('${req.body.userId}', '${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.currency}', '${req.body.language}', '${req.body.timezone}');`;
      pool.query(sql).then((rows) => {
        const result = rows[0];
        if (result && result.length > 0 && result[0][0].flag) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message: 'USER_UPDATED' }));
        } else {
          res.writeHead(401, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message: 'USER_NOT_FOUND' }));
        }
      }).catch((sqlerr) => {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: sqlerr }));
      });
    } else {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: err }));
    }
  });
});

module.exports = router;
