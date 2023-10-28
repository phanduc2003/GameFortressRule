const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    checkAdmin: {
      type: Boolean,
      default: false, 
    },
    myGem: {
      type: Number,
      required: true,
    },
  });
  

module.exports = mongoose.model('User', UserSchema);
