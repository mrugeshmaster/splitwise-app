/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const pool = require('../pool.js');

const imageStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/storage/users`,
  filename: (req, file, callback) => {
    callback(null, `user${req.params.user_id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const groupImageStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/storage/groups`,
  filename: (req, file, callback) => {
    callback(null, `group_${req.params.groupName}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: imageStorage,
  limits: { filesize: 1000000 },
}).single('image');

const uploadGroupImage = multer({
  storage: groupImageStorage,
  limits: { filesize: 1000000 },
}).single('groupImage');

router.post('/:user_id', (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      console.log('Inside upload POST request');
      const sql = `UPDATE users SET image='${req.file.filename}' WHERE user_id=${req.params.user_id}`;
      pool.query(sql).then((rows) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: req.file.filename }));
      }).catch((sqlerr) => {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: sqlerr }));
      });
    } else {
      // console.log('Error!');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: err }));
    }
  });
});

router.post('/group/:groupName', (req, res) => {
  uploadGroupImage(req, res, (err) => {
    if (!err) {
      console.log('Inside upload POST request');
      const sql = `UPDATE groups SET group_image='${req.file.filename}' WHERE group_name='${req.params.groupName}'`;
      console.log(sql);
      pool.query(sql).then((rows) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: req.file.filename }));
      }).catch((sqlerr) => {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: sqlerr }));
      });
    } else {
      // console.log('Error!');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: err }));
    }
  });
});

router.get('/:userImage', (req, res) => {
  console.log('Inside user image GET request');
  // console.log('Req Body : ', req.body);
  const image = `${path.join(__dirname, '..')}/public/storage/users/${req.params.userImage}`;

  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/storage/users/userPlaceholder.png`);
  }
});

router.get('/group/:group_image', (req, res) => {
  console.log('Inside group image GET request');
  console.log('Req Body : ', req.body);
  const image = `${path.join(__dirname, '..')}/public/storage/groups/${req.params.group_image}`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/storage/groups/groupPlaceholder.png`);
  }
});

module.exports = router;
