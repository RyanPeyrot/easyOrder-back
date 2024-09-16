const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    description:{
        type:String,
        required:true
    },
    price_in_cent:{
        type:Number,
        required:true,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    artisan_id:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Product',productSchema);