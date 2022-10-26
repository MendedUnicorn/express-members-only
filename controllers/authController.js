const Member = require('../models/member');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const passport = require('passport');

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/log-in');
};

exports.singup_get = (req, res, next) => {
  res.render('sign-up-form');
};

exports.singup_post = [
  // sanetize
  body('firstName', 'Name must be more than 1 letter and less than 20')
    .trim()
    .isLength({ min: 2, max: 20 })
    .isAlpha('nb-NO')
    .withMessage('Name must contain only letters of the alphabet'),
  body('lastName', 'Name must be more than 1 letter and less than 20')
    .trim()
    .isLength({ min: 2, max: 20 })
    .isAlpha('nb-NO')
    .withMessage('Name must contain only letters of the alphabet'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email adress.')
    .normalizeEmail(),
  body('username', 'Username must be between 2 and 20 characters')
    .trim()
    .escape()
    .isLength({ min: 2, max: 20 }),
  body('password')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be 8 or more characters')
    .matches('[0-9]')
    .withMessage('Password Must Contain a Number')
    .matches('[A-Z]')
    .withMessage('Password Must Contain an Uppercase Letter')
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const member = new Member({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render('sign-up-form', { member, errors: errors.array() });
      return;
    }

    // check that passwords match
    if (req.body.password !== req.body['password-confirmation']) {
      res.render('sign-up-form', { err: 'The passwords do not match' });
      return;
    }
    // check if username is taken or not
    Member.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        console.log(error);
        return next(err);
      }
      if (user) {
        console.log('user exists');
        res.render('sign-up-form', { member, err: 'User already exists' });
      }
      if (!user) {
        //hash password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return next(err);
          }
          // add the hashed passoword to the new member object
          member.password = hashedPassword;
          // all is good, save new user to DB
          member.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect('/');
          });
        });
      }
    });

    //sanetize all inputs in form
  },
];

exports.login_get = (req, res, next) => {
  res.render('log-in-form', { err: req.flash('error') });
};
exports.login_post = passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/auth/log-in',
  failureMessage: true,
  failureFlash: 'Username or password is inccorect',
});

exports.logout_get = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
// exports.login_post = (req, res, next) => {

// };
