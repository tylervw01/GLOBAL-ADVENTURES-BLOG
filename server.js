// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/globalAdventures', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import models
const User = require('./mongodb/User');
const Journey = require('./mongodb/Journey');
const Comment = require('./mongodb/Comment');

// Contact form route
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Save as a "User" entry for now (or create a separate Contact model if you prefer)
    const user = new User({ name, email });
    await user.save();

    // Respond success
    res.status(200).json({ success: true, msg: 'Message received!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Example route: create a journey
app.post('/journey', async (req, res) => {
  try {
    const { title, description, destination, createdBy } = req.body;

    const journey = new Journey({
      title,
      description,
      destination,
      createdBy
    });

    await journey.save();
    res.status(200).json({ success: true, journey });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Example route: add a comment
app.post('/comment', async (req, res) => {
  try {
    const { journeyId, authorId, text } = req.body;

    const comment = new Comment({ journeyId, authorId, text });
    await comment.save();

    res.status(200).json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
