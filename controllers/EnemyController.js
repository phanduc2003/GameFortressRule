const Enemy = require('../models/Enemy');

//GET ALL USER
async function getAllEnemy() {
    try {
        let enemy = await Enemy.find({});
        return enemy;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//INSERT ENEMY
async function insert(nameEnemy, health, speed, ability, image) {
    try {
        if (!nameEnemy) {
            return "Please check Name Enemy";
        }
        else if (!health) {
            return "Please check Health";
        }
        else if (!speed) {
            return "Please check Speed";
        }
        else if (!ability) {
            return "Please check Ability";
        }
        else if (!image) {
            return "Please check Image";
        }
        let enemy = new Enemy({nameEnemy, health, speed, ability, image });
        await enemy.save();
        console.log("Insert Enemy Success..");
    } catch (error) {
        console.log(error);
    }
}

async function update(_id, nameEnemy, health, speed, ability, image) {
    try {
        let enemy = {
            nameEnemy: nameEnemy,
            health: health,
            speed: speed,
            ability: ability,
            image: image,
        };
        await Enemy.findByIdAndUpdate({ _id }, enemy);
        console.log("update Enemy success..");
    } catch (error) {
        console.log(error);
    }
}


//DELETE USER BY ID
async function deleteById(_id) {
    try {
        let enemy = await Enemy.findOneAndRemove({ _id });
        console.log("Delete success...");
        return enemy;
    } catch (error) {
        console.log(error);
    }
}

async function getById(_id) {
    try {
        let enemy = await Enemy.findOne({ _id });
        return enemy;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllEnemy, insert, update, deleteById, getById}