const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true,
        default: "",
    }
})

module.exports = mongoose.model('Category',categorySchema);
