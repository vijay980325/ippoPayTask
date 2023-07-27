const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    isActive: {
        type: Number
    }
}, {
    timestamps: true
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;