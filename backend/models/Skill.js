const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    skill: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Skill', SkillSchema);
