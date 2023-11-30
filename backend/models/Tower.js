const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TowerSchema = new Schema({
    nameTower: {
      type: String,
      required: true,
    },
    levelTower: {
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

module.exports = mongoose.model('Tower', TowerSchema);
