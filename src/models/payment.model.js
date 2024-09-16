const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const paymentSchema = new Schema({
    order_id:{
        type:Types.ObjectId,
        ref:'Order',
        required:true
    },
    amount_in_cent:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'completed', 'failed'],
        default:'pending'
    },
    payment_method: {
        type: String,
        enum: ['credit card', 'paypal', 'bank transfer', 'cash'],
        required: true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Payment',paymentSchema);