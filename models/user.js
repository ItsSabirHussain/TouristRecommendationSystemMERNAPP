const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String
  },
  ID: {
    type: String,
    required: true
  },
  Key: {
    type: String,
    required: true
  },
  Interests: {
    type: String,
    value: [String]
  }
});
module.exports = mongoose.model("User", User);
