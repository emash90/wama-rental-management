const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenants',
        required: true
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Houses',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Payments', paymentSchema);