const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    purchasedMoney: {
        type: Number,
        required: true,
    },
    purchasedGems: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('History', HistorySchema);
