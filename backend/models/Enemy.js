const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnemySchema = new Schema({
  nameEnemy:{
    type: String,
    required: true,
  },
  health: { 
    type: Number, 
    required: true, 
  },
  speed: { 
    type: Number, 
    required: true,
  },
  ability: { 
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Enemy', EnemySchema);
