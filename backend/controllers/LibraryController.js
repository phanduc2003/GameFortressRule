const Enemy = require('../models/Enemy');
const Item = require('../models/Item');
const Map = require('../models/Maps');
const Tower = require('../models/Tower');

//GET ALL ENEMY
async function getAllEnemy() {
    try {
        let enemy = await Enemy.find({});
        return enemy;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getAllItem() {
    try {
        let item = await Item.find({});
        return item;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getAllMap() {
    try {
        let map = await Map.find({});
        return map;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getAllTower() {
    try {
        let tower = await Tower.find({});
        return tower;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {getAllEnemy, getAllItem, getAllMap, getAllTower}