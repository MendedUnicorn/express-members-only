const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

module.exports = mongoose.model('Test', TestSchema);
