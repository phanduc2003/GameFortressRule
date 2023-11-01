const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    action: {
        type: String,
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
