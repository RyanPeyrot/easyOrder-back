const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const favoriteSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor: [{
        type: Types.ObjectId,
        ref: 'User',
    }]
})

module.exports = mongoose.model('FavoriteVendor',favoriteSchema);