const Currency = require('../models/Currency');
const User = require('../models/User');
const History = require('../models/History');

//GET ALL
async function getAll() {
    try {
        let currency = await Currency.find({});
        return currency;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getCurrencyById(id) {
    try {
        const currency = await Currency.findById(id);
        return currency;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getOneUser(_id) {
    try {
        const user = await User.findOne({ _id });
        return user;
    } catch (err) {
        console.log(err);
        return null; 
    }
}

async function updateMyGem(userId, gemAmount, currency) {
    try {
        if (!userId) {
            throw new Error('Invalid user ID');
        }

        const formattedMoney = currency.money.toLocaleString();

        const historyRecord = new History({
            purchasedMoney: `${formattedMoney}`,
            purchasedGems: ` ${gemAmount} `,
            user: userId,
        });

        console.log('purchasedMoney:', historyRecord.purchasedMoney);

        await historyRecord.save();

        await User.findByIdAndUpdate(userId, { $push: { history: historyRecord._id }, $inc: { myGem: gemAmount } });
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {getAll, getCurrencyById, updateMyGem, getOneUser };