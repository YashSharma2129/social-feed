const express = require('express');
const router = express.Router();

const { getFeed } = require('../controllers/feedController');
const cacheFeed = require('../middleware/cache');

router.get('/', cacheFeed, getFeed);

module.exports = router;