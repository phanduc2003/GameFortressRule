const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const CurrencyController = require('../controllers/CurrencyController');

//GET ALL
router.get('/', async (req, res) => {
    try {
        let currencies = await CurrencyController.getAll();
        currencies = currencies.map((el, index) => {
            return {
                _id: el._id,
                money: el.money,
                gem: el.gem,
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

//INSERT 
router.get('/new', (req, res) => {
    let userId = req.query.id;
    res.render('admin/currency/insertCurrencies', { userId: userId });  
});

//HANDLE INSERT    
router.post('/new', async (req, res, next) => {
    let userId = req.query.id;
    try {
       
        let { money, gem } = req.body;
        const errorMessage = await CurrencyController.insert( money, gem );
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
router.post('/:id/edit', async function (req, res, next) {
    let userId = req.query.id;
    let _id = req.params.id;
    try {
        let { money, gem } = req.body;
        await CurrencyController.update(_id, money, gem);
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
