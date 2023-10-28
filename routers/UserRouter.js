const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Trang hiển thị danh sách người dùng
router.get('/', async (req, res) => {
    try {
        let users = await UserController.getAllUser();
        users = users.map((el, index) => {
            return {
                _id: el._id,
                username: el.username,
                email: el.email,              
                checkAdmin: el.checkAdmin,
                index: index + 1,
            }
        });
        res.render('admin/user/manageUsers', { nd : users }); 
        console.log(users);
    } catch (error) {
        console.log(error);
        res.redirect('/admin/user/manageUsers'); 
    }
});

//DELETE USER
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.query.id; 
    try {
        await UserController.deleteById(_id);
        console.log("Delete user OK");
        res.redirect(`/user?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;