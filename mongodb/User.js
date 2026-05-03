const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
