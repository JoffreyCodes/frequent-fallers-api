const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stuffySchema = new Schema({
  stuffyName: String,
  primaryColor: String,
  secondaryColor: String
});

module.exports = mongoose.model('Stuffy', stuffySchema);