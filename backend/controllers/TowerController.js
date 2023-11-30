const Tower = require('../models/Tower');

//GET ALL USER
async function getAll() {
    try {
        let tower = await Tower.find({});
        return tower;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//INSERT ENEMY
async function insert(nameTower, levelTower, describe, image) {
    try {
        if (!nameTower) {
            return "Please check Name Tower";
        }
        else if (!levelTower) {
            return "Please check Level Tower";
        }
        else if (!describe) {
            return "Please check Describe";
        }
        else if (!image) {
            return "Please check Image";
        }
        let tower = new Tower({nameTower, levelTower, describe, image});
        await tower.save();
        console.log("Insert Category Success..");
    } catch (error) {
        console.log(error);
    }
}

async function update(_id, nameTower, levelTower, describe, image) {
    try {
        let tower = {
            nameTower: nameTower,
            levelTower: levelTower,
            describe: describe,
            image: image,
        };
        await Tower.findByIdAndUpdate({ _id }, tower);
        console.log("update Category success..");
    } catch (error) {
        console.log(error);
    }
}


//DELETE USER BY ID
async function deleteById(_id) {
    try {
        let tower = await Tower.findOneAndRemove({ _id });
        console.log("Delete success...");
        return tower;
    } catch (error) {
        console.log(error);
    }
}

async function getById(_id) {
    try {
        let tower = await Tower.findOne({ _id });
        return tower;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAll, insert, update, deleteById, getById}