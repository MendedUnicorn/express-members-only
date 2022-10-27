const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    firstName: { type: String, required: true, maxLength: 30 },
    lastName: { type: String, required: true, maxLength: 30 },
    email: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    membershipStatus: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MemberSchema.virtual('url').get(function () {
  return `/secret/member/${this._id}`;
});

MemberSchema.virtual('name').get(function () {
  if (this.firstName && this.lastName) {
    return this.firstName + ' ' + this.lastName;
  } else {
    return '';
  }
});

module.exports = mongoose.model('Member', MemberSchema);
