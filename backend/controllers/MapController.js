const Map = require('../models/Maps');

//GET ALL MAP
async function getAll() {
    try {
        let map = await Map.find({});
        return map;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//INSERT MAP
async function insert(nameMap, information, image) {
    try {
        if (!nameMap) {
            return "Please check Name Map";
        }
        else if (!information) {
            return "Please check Information";
        }
        else if (!image) {
            return "Please check Image";
        }
        let map = new Map({nameMap, information, image});
        await map.save();
        console.log("Insert Map Success..");
    } catch (error) {
        console.log(error);
    }
}

async function update(_id, nameMap, information, image) {
    try {
        let map = {
            nameMap: nameMap,
            information: information,
            image: image,
        };
        await Map.findByIdAndUpdate({ _id }, map);
        console.log("update Map success..");
    } catch (error) {
        console.log(error);
    }
}


//DELETE USER BY ID
async function deleteById(_id) {
    try {
        let map = await Map.findOneAndRemove({ _id });
        console.log("Delete success...");
        return map;
    } catch (error) {
        console.log(error);
    }
}

async function getById(_id) {
    try {
        let tower = await Map.findOne({ _id });
        return tower;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAll, insert, update, deleteById, getById}