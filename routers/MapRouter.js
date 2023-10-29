const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const MapController = require('../controllers/MapController');
let uploadMiddleware = require('../middleware/upload');

//GET ALL ENEMY
router.get('/', async (req, res) => {
    try {
        let maps = await MapController.getAll();
        maps = maps.map((el, index) => {
            return {
                _id: el._id,
                nameMap: el.nameMap,
                information: el.information,
                image: el.image,
                index: index + 1,
            }
        });
        res.render('admin/map/manageMaps', { mp : maps }); 
        console.log(maps);
    } catch (error) {
        console.log(error);
        res.redirect('admin/map/manageMaps'); 
    }
});

//INSERT ENEMY
router.get('/new', (req, res) => {
    let userId = req.query.id;
    res.render('admin/map/insertMaps', { userId: userId });  
});

//HANDLE INSERT ENEMY   
router.post('/new', [uploadMiddleware.single('image'),], async (req, res, next) => {
    let userId = req.query.id;
    try {
        let { file } = req;
        let { nameMap, information, image } = req.body;
        image = file ? file.filename : '';
        const errorMessage = await MapController.insert( nameMap, information, image );
        if (errorMessage) {
            res.render('admin/map/insertMaps', { userId: userId, errorMessage: errorMessage });
        } else {
            res.redirect(`/maps?id=${userId}`);
        }
    } catch (error) {
        console.log(error);
    }
});

//UPDATE ENEMY
router.get('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    let userId = req.query.id;
    try {
        let maps = await MapController.getById(_id);
        res.render('admin/map/updateMaps', { mp : maps, userId: userId });
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
        let { nameMap, information, image } = req.body;
        if (file) {
            image = file.filename;
        }else{
            image = image;
        } 
        await MapController.update(_id, nameMap, information, image);
        res.redirect(`/maps?id=${userId}`);
    } catch (error) {
        console.log(error); 
    }
});

//DELETE USER
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.query.id; 
    try {
        await MapController.deleteById(_id);
        console.log("Delete map OK");
        res.redirect(`/maps?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
