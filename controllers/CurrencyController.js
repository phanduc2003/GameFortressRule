const Currency = require('../models/Currency');

//GET ALL USER
async function getAll() {
    try {
        let currency = await Currency.find({});
        return currency;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//INSERT ENEMY
async function insert(money, gem, image) {
    try {
        let currency = new Currency({money, gem, image});
        await currency.save();
        console.log("Insert Category Success..");
    } catch (error) {
        console.log(error);
    }
}

async function update(_id, money, gem, image) {
    try {
        let currency = {
            money: money,
            gem: gem,
            image: image,
        };
        await Currency.findByIdAndUpdate({ _id }, currency);
        console.log("update Category success..");
    } catch (error) {
        console.log(error);
    }
}


//DELETE USER BY ID
async function deleteById(_id) {
    try {
        let currency = await Currency.findOneAndRemove({ _id });
        console.log("Delete success...");
        return currency;
    } catch (error) {
        console.log(error);
    }
}

async function getById(_id) {
    try {
        let currency = await Currency.findOne({ _id });
        return currency;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAll, insert, update, deleteById, getById}