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
    type: String
  },
  Key: {
    type: String
  }
});
module.exports = mongoose.model("Admin", Admin);
