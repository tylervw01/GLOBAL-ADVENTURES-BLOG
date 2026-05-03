const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  journeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journey' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
