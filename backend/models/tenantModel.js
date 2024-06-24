const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 1 // 0 = inactive , 1 = active
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tenants', tenantSchema);