// HistoryRouter.js
const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');


router.get('/', async (req, res) => {
    try {
        const userId = req.query.id; 
        let userHistory = await HistoryController.getUserHistory(userId);

        // Sắp xếp userHistory theo ngày và thời gian giảm dần
        userHistory = userHistory.sort((a, b) => {
            const dateTimeA = new Date(`${a.date} ${a.time}`);
            const dateTimeB = new Date(`${b.date} ${b.time}`);
            return dateTimeB - dateTimeA;
        });

        res.render('user/history', { userHistory });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
