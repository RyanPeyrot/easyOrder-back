const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const sizeSchema = new Schema({
    sizeLabel: {type: String, required: true},
    dimensions: {
        height: {value: {type: Number}, unit: {type: String, default:"cm"}},
        width: {value: {type: Number}, unit: {type: String, default:"cm"}},
        depth: {value: {type: Number}, unit: {type: String, default:"cm"}}
    },
    weight: {
        value: {type: Number},
        unit: {type: String, default:"kg"}
    }
});

const productSchema = new Schema({
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
    initial_stock: {
        type: Number,
        required: true,
        min: 1
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
    categories: [{
        type: Types.ObjectId,
        ref: 'Category',
    }],
    size: sizeSchema,
    pictures: [{
        url: {type: String, required: true},
        _id: {type: String, required: true}
    }],
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

productSchema.path('pictures').validate(function (pictures) {
    return pictures.length <= 10;
}, 'Le produit ne peut pas avoir plus de 10 images.');

module.exports = mongoose.model('Product',productSchema);
