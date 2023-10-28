const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const TowerController = require('../controllers/TowerController');
let uploadMiddleware = require('../middleware/upload');

//GET ALL ENEMY
router.get('/', async (req, res) => {
    try {
        let towers = await TowerController.getAll();
        towers = towers.map((el, index) => {
            return {
                _id: el._id,
                nameTower: el.nameTower,
                levelTower: el.levelTower,
                describe: el.describe,
                image: el.image,
                index: index + 1,
            }
        });
        res.render('admin/tower/manageTowers', { tw : towers }); 
        console.log(towers);
    } catch (error) {
        console.log(error);
        res.redirect('admin/tower/manageTowers'); 
    }
});

//INSERT ENEMY
router.get('/new', (req, res) => {
    let userId = req.query.id;
    res.render('admin/tower/insertTowers', { userId: userId });  
});

//HANDLE INSERT ENEMY   
router.post('/new', [uploadMiddleware.single('image'),], async (req, res, next) => {
    let userId = req.query.id;
    try {
        let { file } = req;
        let { nameTower, levelTower, describe, image} = req.body;
        image = file ? file.filename : '';
        await TowerController.insert( nameTower, levelTower, describe, image );
        res.redirect(`/towers?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

//UPDATE ENEMY
router.get('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    let userId = req.query.id;
    try {
        let towers = await TowerController.getById(_id);
        res.render('admin/tower/updateTowers', { tw : towers, userId: userId });
    } catch (error) {
        console.log(error);
    }
});

//HANDLE UPDATE ENEMY
router.post('/:id/edit', [uploadMiddleware.single('image'), ], async function (req, res, next) {
    let _id = req.params.id;
    let userId = req.query.id;
    try {
        let { file } = req;
        let { nameTower, levelTower, describe, image } = req.body;
        if (file) {
            image = file.filename;
        }else{
            image = image;
        } 
        await TowerController.update(_id, nameTower, levelTower, describe, image);
        res.redirect(`/towers?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

//DELETE USER
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.query.id; 

    try {
        await TowerController.deleteById(_id);
        console.log("Delete tower OK");
        res.redirect(`/towers?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
