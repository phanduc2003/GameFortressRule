const Item = require('../models/Item');

//GET ALL USER
async function getAllItem() {
    try {
        let item = await Item.find({});
        return item;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//INSERT ENEMY
async function insert(nameItem, priceItem, describe, image) {
    try {
        let item = new Item({nameItem, priceItem, describe, image});
        await item.save();
        console.log("Insert Item Success..");
    } catch (error) {
        console.log(error);
    }
}

async function update(_id, nameItem, priceItem, describe, image) {
    try {
        let item = {
            nameItem: nameItem,
            priceItem: priceItem,
            describe: describe,
            image: image,
        };
        await Item.findByIdAndUpdate({ _id }, item);
        console.log("update Item success..");
    } catch (error) {
        console.log(error);
    }
}


//DELETE USER BY ID
async function deleteById(_id) {
    try {
        let item = await Item.findOneAndRemove({ _id });
        console.log("Delete success...");
        return item;
    } catch (error) {
        console.log(error);
    }
}

async function getById(_id) {
    try {
        let item = await Item.findOne({ _id });
        return item;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllItem, insert, update, deleteById, getById}