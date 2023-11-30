// HistoryController.js
const User = require('../models/User');
const History = require('../models/History');
const moment = require('moment-timezone');

async function getUserHistory(userId) {
    try {
        const user = await User.findById(userId).populate('history');
        
        const formattedHistory = user.history.map((record) => {
            const formattedDate = moment(record.date).tz('Asia/Ho_Chi_Minh');
            return {
                purchasedMoney: record.purchasedMoney,
                purchasedGems: record.purchasedGems,
                date: formattedDate.format('YYYY-MM-DD'),
                time: formattedDate.format('HH:mm:ss'),
            };
        });

        return formattedHistory;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { getUserHistory };
