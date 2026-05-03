const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    // DONE: Add title field with String type, required validation, trim, and minlength
    // DONE: Add content field with String type, required validation, trim, and minlength
    // DONE: Add author field with String type, required validation, and trim
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // DONE: Enable timestamps to track creation and update times
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);