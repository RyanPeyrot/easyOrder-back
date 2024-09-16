const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const orderItemSchema = new Schema({
    order_id:{
        type:Types.ObjectId,
        ref:'Order',
        required:true
    },
    product_id:{
        type:Types.ObjectId,
        ref:'Product',
        required:true
    },
    price_in_cent:{
        type:Number,
        required:true,
        min:0
    },
    quantity: {
        type: Number,
        required:true,
        min:0
    }
})

module.exports = mongoose.model('Order_item',orderItemSchema);