const { body, validationResult } = require('express-validator');
const Message = require('../models/message');
const { DateTime } = require('luxon');

exports.index = (req, res, next) => {
  res.render('index', {});
};

exports.message_create_get = (req, res, next) => {
  console.log('t', req.user._id);
  res.render('message-form');
};
exports.message_create_post = [
  body('title', 'The title should be longer than 2 characters')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape(),
  body('message', 'The message should be longer than 2 characters')
    .trim()
    .isLength({ min: 2, max: 1000 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      creator: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render('message-form', { message, errors: errors.array() });
      return;
    }
    message.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
];

exports.message_update_get = (req, res, next) => {};
exports.message_update_post = (req, res, next) => {};
exports.message_delete_get = (req, res, next) => {};
exports.message_delete_post = (req, res, next) => {};

exports.message_detail = (req, res, next) => {};

exports.message_list = (req, res, next) => {
  Message.find()
    .populate('creator')
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      if (req.user?.membershipStatus) {
        messages.forEach((message) => {
          message.createTime = DateTime.fromJSDate(
            message.createdAt
          ).toLocaleString(DateTime.DATETIME_MED);
        });
      } else {
        messages.forEach((message) => {
          message.creator.username = 'Anonymous';
          message.createTime = 'At some point';
        });
      }

      res.render('secret', { messages });
    });
};
