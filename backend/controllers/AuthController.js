const User = require('../models/User');

//REGISTER
async function signup(username, password, email, isAdmin = false) {
    try {
        let user = new User({ username, password, email, checkAdmin: isAdmin, myGem: 0 });
        await user.save();
        console.log("Register Success..");
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

//LOGIN 
async function login(username, password) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("Tên đăng nhập không tồn tại.");
            return null; 
        } 

        if (user.password !== password) {
            console.log("Mật khẩu không chính xác.");
            return null; 
        }

        console.log("Đăng nhập thành công!");
        return user; 
    } catch (err) {
        console.log(err);
        return null; 
    }
}

//PROFILE
async function profile(_id) {
    try {
        const user = await User.findOne({ _id });
        return user;
    } catch (err) {
        console.log(err);
        return null; 
    }
}

async function getTotalRegisteredUsers() {
    try {
        const totalUsers = await User.countDocuments();
        return totalUsers;
    } catch (error) {
        console.log("Error in getTotalRegisteredUsers():", error);
    }
}

async function updateGem(userId, newGemValue) {
    try {
      const user = await User.findByIdAndUpdate(userId, { $set: { myGem: newGemValue } }, { new: true });
      console.log('Updated User:', user);
      return user;
    } catch (error) {
      throw error;
    }
  }

module.exports = {signup, login, profile, getTotalRegisteredUsers, updateGem }