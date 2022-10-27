var express = require('express');
const { checkAuthenticated } = require('../controllers/authController');
const auth = require('../controllers/authController');
var router = express.Router();

const message = require('../controllers/messageController');

router.get('/', checkAuthenticated, auth.profile_get);
//router.post('/', checkAuthenticated, message.message_create_post);

module.exports = router;
