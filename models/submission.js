const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  date: String,
  stuffyName: String,
  didFall: Boolean,
});

module.exports = mongoose.model('Submission', submissionSchema);