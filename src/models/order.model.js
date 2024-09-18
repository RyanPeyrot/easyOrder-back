const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");
const addressSchema = require('./address.model');

const orderSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    total_in_cent: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    delivery_address: {
        type: addressSchema,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);