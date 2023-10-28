const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const LibraryController = require('../controllers/LibraryController');


router.get('/', async (req, res) => {
    try {
        let enemies = await LibraryController.getAllEnemy();
        let items = await LibraryController.getAllItem();
        let maps = await LibraryController.getAllMap();
        let towers = await LibraryController.getAllTower();

        res.render('user/library', { enemies, items, maps, towers }); 
    } catch (error) {
        console.log(error);
        res.redirect('user/library'); 
    }
});

module.exports = router;
