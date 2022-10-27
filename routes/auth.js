var express = require('express');
var router = express.Router();
const passport = require('passport');

const auth = require('../controllers/authController');

// Sign up
router.get('/sign-up', auth.singup_get);
router.post('/sign-up', auth.singup_post);

// Log in
router.get('/log-in', auth.login_get);
router.post('/log-in', auth.login_post);

// Log out
router.get('/log-out', auth.logout_get);

// Membership
router.get('/membership', auth.checkAuthenticated, auth.membership_get);
router.post('/membership', auth.checkAuthenticated, auth.membership_post);

// admin access
router.get('/admin', auth.checkAuthenticated, auth.admin_get);
router.post('/admin', auth.checkAuthenticated, auth.admin_post);

module.exports = router;
