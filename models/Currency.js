const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    money: {
      type: String,
      required: true,
    },
    gem: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model('Currency', CurrencySchema);
