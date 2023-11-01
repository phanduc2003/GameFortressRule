// HistoryController.js
const User = require('../models/User');
const History = require('../models/History');
const moment = require('moment-timezone');

async function getUserHistory(userId) {
    try {
        const user = await User.findById(userId).populate('history');
        
        const formattedHistory = user.history.map((record) => ({
            action: record.action,
            date: moment(record.date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
        }));

        return formattedHistory;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { getUserHistory };
