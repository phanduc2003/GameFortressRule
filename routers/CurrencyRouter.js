const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const CurrencyController = require('../controllers/CurrencyController');
let uploadMiddleware = require('../middleware/upload');

//GET ALL ENEMY
router.get('/', async (req, res) => {
    try {
        let currencies = await CurrencyController.getAll();
        currencies = currencies.map((el, index) => {
            return {
                _id: el._id,
                money: el.money,
                gem: el.gem,
                image: el.image,
                index: index + 1,
            }
        });
        res.render('admin/currency/manageCurrencies', { cc : currencies }); 
        console.log(currencies);
    } catch (error) {
        console.log(error);
        res.redirect('admin/currency/manageCurrencies'); 
    }
});

//INSERT ENEMY
router.get('/new', (req, res) => {
    let userId = req.query.id;
    res.render('admin/currency/insertCurrencies', { userId: userId });  
});

//HANDLE INSERT ENEMY   
router.post('/new', [uploadMiddleware.single('image'),], async (req, res, next) => {
    let userId = req.query.id;
    try {
        let { file } = req;
        let { money, gem, image } = req.body;
        image = file ? file.filename : '';
        const errorMessage = await CurrencyController.insert( money, gem, image );
        if (errorMessage) {
            res.render('admin/currency/insertCurrencies', { userId: userId, errorMessage: errorMessage });
        } else {
            res.redirect(`/currencies?id=${userId}`);
        }
    } catch (error) {
        console.log(error);
    }
});

//UPDATE ENEMY
router.get('/:id/edit', async function (req, res, next) {
    let userId = req.query.id;
    let _id = req.params.id;
    try {
        let currencies = await CurrencyController.getById(_id);
        res.render('admin/currency/updateCurrencies', { cc : currencies, userId: userId });
    } catch (error) {
        console.log(error);
    }
});

//HANDLE UPDATE ENEMY
router.post('/:id/edit', [uploadMiddleware.single('image'), ], async function (req, res, next) {
    let userId = req.query.id;
    let _id = req.params.id;
    try {
        let { file } = req;
        let { money, gem, image } = req.body;
        if (file) {
            image = file.filename;
        }else{
            image = image;
        } 
        await CurrencyController.update(_id, money, gem, image);
        res.redirect(`/currencies?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

//DELETE USER
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.query.id; 
    try {
        await CurrencyController.deleteById(_id);
        console.log("Delete currencies OK");
        res.redirect(`/currencies?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
