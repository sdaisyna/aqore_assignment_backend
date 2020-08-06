const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true

    },
    email:{
        type: String,
        require: true

    },
    phone:{
        type: String,
        require: true

    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
