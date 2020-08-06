const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
