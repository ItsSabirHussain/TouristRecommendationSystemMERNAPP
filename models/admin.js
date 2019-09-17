const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
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
  }
});
module.exports = mongoose.model("Admin", Admin);
