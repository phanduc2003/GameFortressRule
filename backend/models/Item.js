const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    nameItem: {
      type: String,
      required: true,
    },
    priceItem: {
      type: String,
      required: true,
    },
    describe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });
  

module.exports = mongoose.model('Item', ItemSchema);
