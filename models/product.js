const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require: true
    },
    product_details: {
        type: String,
        require: true
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 