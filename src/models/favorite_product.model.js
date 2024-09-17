const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const favoriteSchema = new Schema({
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

module.exports = mongoose.model('FavoriteProduct',favoriteSchema);