const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    message: { type: String, required: true, maxLength: 1000 },
    creator: { type: Schema.Types.ObjectId, ref: 'Member', requried: true },
  },
  { timestamps: true }
);

MessageSchema.virtual('url').get(function () {
  `/secret/message/${this._id}`;
});

MessageSchema.virtual('creationTime').get(function () {
  this.createdAt;
});

module.exports = mongoose.model('Message', MessageSchema);
