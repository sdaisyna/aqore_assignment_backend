const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesTransaction'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    invoice_date: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Invoice', invoiceSchema); 