const Currency = require('../models/Currency');
const User = require('../models/User');

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

async function updateMyGem(userId, gemAmount) {
    try {
        await User.updateOne({ _id: userId }, { $inc: { myGem: gemAmount } });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {getAll, getCurrencyById, updateMyGem, getOneUser };