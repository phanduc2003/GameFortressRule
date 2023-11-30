const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ItemController = require('../controllers/ItemController');
let uploadMiddleware = require('../middleware/upload');

//GET ALL ENEMY
router.get('/', async (req, res) => {
    try {
        let items = await ItemController.getAllItem();
        items = items.map((el, index) => {
            return {
                _id: el._id,
                nameItem: el.nameItem,
                priceItem: el.priceItem,              
                describe: el.describe,
                image: el.image,
                index: index + 1,
            }
        });
        res.render('admin/item/manageItems', { it : items }); 
        console.log(items);
    } catch (error) {
        console.log(error);
        res.redirect('admin/item/manageItems'); 
    }
});

//INSERT ENEMY
router.get('/new', (req, res) => {
    let userId = req.query.id;
    res.render('admin/item/insertItems', {userId: userId});
});

//HANDLE INSERT ENEMY
router.post('/new', [uploadMiddleware.single('image'),], async (req, res, next) => {
    let userId = req.query.id;
    try {
        let { file } = req;
        let { nameItem, priceItem, describe, image} = req.body;
        image = file ? file.filename : '';
        const errorMessage = await ItemController.insert( nameItem, priceItem, describe, image);
        
        if (errorMessage) {
            res.render('admin/item/insertItems', { userId: userId, errorMessage: errorMessage });
        } else {
            res.redirect(`/items?id=${userId}`);
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
        let items = await ItemController.getById(_id);
        res.render('admin/item/updateitems', { it : items, userId: userId });
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
        let { nameItem, priceItem, describe, image } = req.body;
        if (file) {
            image = file.filename;
        }else{
            image = image;
        } 
        await ItemController.update(_id, nameItem, priceItem, describe, image);
        res.redirect(`/items?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

//DELETE USER
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.query.id; 
    try {
        await ItemController.deleteById(_id);
        console.log("Delete item OK");
        res.redirect(`/items?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
