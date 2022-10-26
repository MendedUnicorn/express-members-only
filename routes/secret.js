const express = require('express');
const router = express.Router();
const message = require('../controllers/messageController');
// const memberController = require('../');

//members routes

router.get('/', message.message_list);

module.exports = router;
