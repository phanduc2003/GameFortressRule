const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const RechangeController = require('../controllers/RechangeController');

//GET ALL
router.get('/', async (req, res) => {
    try {
        let rechages = await RechangeController.getAll();
        rechages = rechages.map((el) => {
            return {
                _id: el._id,
                money: el.money,
                gem: el.gem,
            }
        });
        res.render('user/rechange', { rs: rechages });
        console.log(rechages);
    } catch (error) {
        console.log(error);
        res.redirect('user/rechange');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const currencyId = req.params.id;
        const currency = await RechangeController.getCurrencyById(currencyId);

        if (!currency) {
            // Handle the case where the currency is not found.
            return res.status(404).send('Currency not found');
        }

        const userId = req.query.id;
        const user = await RechangeController.getOneUser(userId);

        res.render('user/rechange_details', { currency, user  });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/payment', async (req, res) => {
    try {
        const userId = req.body.userId;
        const currencyId = req.body.currencyId;

        if (!userId || !currencyId) {
            return res.status(400).send('Invalid user or currency ID'); 
        }

        const currency = await RechangeController.getCurrencyById(currencyId);
        if (!currency) {
            return res.status(404).send('Currency not found');
        }

        await RechangeController.updateMyGem(userId, currency.gem);

        res.redirect(`/rechange?id=${userId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
