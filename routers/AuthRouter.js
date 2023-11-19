const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
let StatsController = require('./../controllers/StatsController');

//LOGIN
router.get('/login', (req, res) => {
    res.render('login');
});

// Xử lý đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { txtUsername, txtPassword } = req.body;
        const loggedInUser = await AuthController.login(txtUsername, txtPassword);

        if (!loggedInUser) {
            return res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
        }

        console.log("Trạng thái admin:", loggedInUser.checkAdmin);
        
        if (loggedInUser.checkAdmin === true) {
            res.redirect(`/homeAdmin?id=${loggedInUser._id}`);
        } else {
            res.redirect(`/homeUser?id=${loggedInUser._id}`);
        }
    } catch (error) {
        console.log(error);
        res.render('login', { error: 'Đã xảy ra lỗi khi đăng nhập.' });
    }
});

//REGISTER
router.get('/signup', (req, res) => {
    res.render('register');
});

// Xử lý đăng ký
router.post('/signup', async (req, res) => {
    try {
        const { txtUsername, txtPassword, txtConfirmPassword, txtEmail, isAdmin } = req.body;

        if (txtPassword !== txtConfirmPassword) {
            return res.render('register', { error: 'Mật khẩu và mật khẩu xác nhận không khớp.' });
        }
        await AuthController.signup(txtUsername, txtPassword, txtEmail, isAdmin);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
});

//LOGOUT
router.get('/logout', (req, res) => {
    res.redirect('/login');
});



//PROFILE USER
router.get('/homeUser', async (req, res) => {
    const _id = req.query.id;
    try {
        const user = await AuthController.profile(_id);
        if (!user) {
            res.redirect('/login');
            console.log('Thông tin user: ' + _id);
            return;
        }
        res.render('homeUser', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

// Tuyến đường để hiển thị biểu mẫu chỉnh sửa thông tin cá nhân
router.get('/:id/edit', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const user = await AuthController.profile(_id);
        res.render('profile', { nd: user });
    } catch (error) {
        console.log(error);
    }
});


// UPDATE PROFILE 
router.post('/:id/update', async (req, res, next) => {
    const _id = req.params.id;
    const { txtUsername, txtEmail, oldPassword, newPassword, confirmNewPassword } = req.body;

    try {
        const user = await AuthController.profile(_id);
        if (!user) {
            res.redirect('/login');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            return res.render('profile', { nd: user, error: 'Mật khẩu mới và mật khẩu xác nhận không khớp.' });
        }

        if (oldPassword) {
            if (oldPassword !== user.password) {
                return res.render('profile', { nd: user, error: 'Mật khẩu cũ không chính xác.' });
            }
            user.password = newPassword;
        }

        user.username = txtUsername;
        user.email = txtEmail;

        await user.save();
        
        res.locals.updateSuccess = true;

        if (user.checkAdmin === true) {
            return res.redirect(`/homeAdmin?id=${_id}`);
        }
        return res.redirect(`/homeUser?id=${_id}`);
    } catch (error) {
        console.error(error);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.redirect('/login')
        }
    })
});

//THONG KE
router.get('/homeAdmin', async (req, res) => {
    const _id = req.query.id;
    try {
        const user = await AuthController.profile(_id);
        if (!user) {
            res.redirect('/login');
            console.log('Thông tin user: ' + _id);
            return;
        }
        // Fetch data for statistical report
        let dailyStats = await StatsController.getDailyStats();
        let dailyUserStats = await StatsController.getDailyUserStats();

        let totalRegisteredUsers = await AuthController.getTotalRegisteredUsers();

        res.render('homeAdmin', {user, dailyStats, dailyUserStats, totalRegisteredUsers });
    } catch (error) {
        console.log("Error in stats route:", error);
        res.redirect('/login');
    }
});


router.get('/daily', async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        let dailyStats = await StatsController.getDailyStats(startDate, endDate);
        res.json(dailyStats);
    } catch (error) {
        console.log("Error in daily stats route:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//THONG KE USER
router.get('/userStats', async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        let dailyUserStats = await StatsController.getDailyUserStats(startDate, endDate);
        res.json(dailyUserStats);
    } catch (error) {
        console.log("Error in user stats route:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;