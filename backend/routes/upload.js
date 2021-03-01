/* eslint-disable no-unused-vars */
const express = require('express');
const { fstat } = require('fs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
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

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      // console.log('Inside upload POST request');
      const sql = `UPDATE users SET image='${req.file.filename}' WHERE user_id=${req.body.user_id}`;
      pool.query(sql, (sqlerr, result) => {
        if (sqlerr) {
          res.writeHead(500, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message: sqlerr }));
        }
      });
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: req.file.filename }));
    } else {
      // console.log('Error!');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: err }));
    }
  });
});

router.get('/', (req, res) => {
  // console.log('Inside image GET request');
  // console.log('Req Body : ', req.body);
  const sql = `SELECT image FROM users WHERE user_id=${req.body.user_id};`;
  // console.log('SQL File : ', sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: err }));
    }
    // console.log(result);
    if (result && result.length > 0) {
      const imageName = result[0].image;
      const image = `${path.join(__dirname, '..')}/public/storage/users/${imageName}`;
      // console.log(image);
      if (fs.existsSync(image)) {
        res.sendFile(image);
      }
    } else {
      res.sendFile(`${path.join(__dirname, '..')}/public/storage/users/userPlaceholder.png`);
    }
  });
});

module.exports = router;
