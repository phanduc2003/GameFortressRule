const User = require('../models/User');

//GET ALL USER
async function getAllUser() {
    try {
        let user = await User.find({});
        console.log("Danh sách người dùng:", user);
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//DELETE USER BY ID
async function deleteById(_id) {
    try {
        let users = await User.findOneAndRemove({ _id });
        console.log("Delete success...");
        return users;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllUser, deleteById}