const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const favoriteSchema = mongoose.Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: Types.ObjectId,
        ref: 'Product',
    }]
})

module.exports = mongoose.model('Favorite',favoriteSchema);