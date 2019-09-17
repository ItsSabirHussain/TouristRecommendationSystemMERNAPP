const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Place = new Schema({
  Name: {
    type: String
  },
  Category: {
    type: String
  },
  Latitude: {
    type: String
  },
  Longitude: {
    type: String
  },
  Tags: {
    type: String,
    value: [String]
  },
  City: {
    type: String
  }
});
module.exports = mongoose.model("Place", Place);
