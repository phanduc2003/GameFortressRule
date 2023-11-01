// HistoryRouter.js
const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');


router.get('/', async (req, res) => {
    try {
        const userId = req.query.id; 
        const userHistory = await HistoryController.getUserHistory(userId);

        console.log("222222222222222222222222",userId);
        console.log("111111111111111111111111",userHistory);

        res.render('user/history', { userHistory });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
