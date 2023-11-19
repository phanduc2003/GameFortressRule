const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    money: {
      type: Number,
      required: true,
    },
    gem: {
      type: Number,
      required: true,
    },
  });

module.exports = mongoose.model('Currency', CurrencySchema);
