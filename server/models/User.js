const mongoose = require('mongoose');
/*MONGOOSE CONNECTION*/
mongoose.connect('mongodb+srv://pratham123:pratham123@cluster0.muip1om.mongodb.net/?retryWrites=true&w=majority')

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