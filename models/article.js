const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
);

module.exports = mongoose.model('Article', articleSchema);
