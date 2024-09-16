const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Category',categorySchema);