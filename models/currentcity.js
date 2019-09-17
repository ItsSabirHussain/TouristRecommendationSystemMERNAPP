const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrentCity = new Schema({
  ID: {
    type: String
  },
  City: {
    type: String
  }
});
module.exports = User = mongoose.model("CurrentCity", CurrentCity);
