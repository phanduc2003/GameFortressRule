const History = require('./../models/History');
const User = require('./../models/User');
const moment = require('moment-timezone');

async function getDailyStats(startDate, endDate) {
    try {
        let matchQuery = { date: {} };

        if (startDate) {
            matchQuery.date.$gte = moment(startDate).startOf('day').toDate();
        }

        if (endDate) {
            matchQuery.date.$lte = moment(endDate).endOf('day').toDate();
        }

        let dailyStats = await History.aggregate([
            {
                $match: matchQuery
            },
            {
                $group: {
                    _id: { 
                        day: { $dateToString: { format: "%Y-%m-%d", date: "$date", timezone: "Asia/Ho_Chi_Minh" } },
                    },
                    totalPurchasedMoney: { $sum: "$purchasedMoney" },
                    count: { $sum: 1 } 
                }
            },
            {
                $sort: { "_id.day": 1 }
            }
        ]);

        return dailyStats.map(entry => ({ 
            ...entry, 
            _id: entry._id.day,
            totalPurchasedMoney: entry.totalPurchasedMoney.toFixed(2)
         }));
    } catch (error) {
        console.log("Error in getDailyStats():", error);
    }
}

async function getDailyUserStats(startDate, endDate) {
    try {
        let matchQuery = { createdAt: {} };

        if (startDate) {
            matchQuery.createdAt.$gte = moment(startDate).startOf('day').toDate();
        }

        if (endDate) {
            matchQuery.createdAt.$lte = moment(endDate).endOf('day').toDate();
        }

        let dailyUserStats = await User.aggregate([
            {
                $match: matchQuery,
            },
            {
                $group: {
                    _id: {
                        day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "Asia/Ho_Chi_Minh" } },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { "_id.day": 1 },
            },
        ]);

        // Calculate total registered users for each day
        let totalUsersPerDay = 0;
        dailyUserStats = dailyUserStats.map(entry => {
            totalUsersPerDay += entry.count;
            return {
                ...entry,
                _id: entry._id.day,
                count: totalUsersPerDay,
            };
        });

        return dailyUserStats;
    } catch (error) {
        console.log("Error in getDailyUserStats():", error);
    }
}

module.exports = { getDailyStats, getDailyUserStats }