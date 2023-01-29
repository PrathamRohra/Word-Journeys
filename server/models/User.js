const mongoose = require('mongoose');
/*MONGOOSE CONNECTION*/


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
