const mongoose = require('mongoose');

const salestransactionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    qauntity: {
        type: String
    },
    sales_date: {
        type: String
    },
    status: {
        type: String,
        default: 'unprocessed',
        enum: ['processed', 'unprocessed']
    }
}, { timestamps: true });

module.exports = mongoose.model('SalesTransaction', salestransactionSchema);