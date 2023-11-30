const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    nameMap: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });
  

module.exports = mongoose.model('Map', MapSchema);
