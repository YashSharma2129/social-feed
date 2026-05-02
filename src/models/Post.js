const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Performance optimization index
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);