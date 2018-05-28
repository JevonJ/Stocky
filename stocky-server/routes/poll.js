const express = require('express');
const Pusher = require('pusher');

const router = express.Router();

var pusher = new Pusher({
  appId: '533310',
  key: 'cde306270271a11d34e8',
  secret: '3c956e544e2adf032592',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req, res) => {
  res.send('POLL');
});

router.post('/', (req, response) => {
  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os,
  });

  return res.json({ 
    success: true,
    message: 'Thankyou for voting'
  });
});
module.exports = router;