var express = require('express');
const { checkAuthenticated } = require('../controllers/authController');
var router = express.Router();

const message = require('../controllers/messageController');

router.get('/create', checkAuthenticated, message.message_create_get);
router.post('/create', checkAuthenticated, message.message_create_post);

module.exports = router;
