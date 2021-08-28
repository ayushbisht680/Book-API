const mongoose = require("mongoose");
// Create a Book Schema

const BookSchema = mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  language: String,
  pubDate: String,
  numOfPage: Number,
  category: [String],
  publication: Number,
});

// Create a Book model(collection name in database)

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
