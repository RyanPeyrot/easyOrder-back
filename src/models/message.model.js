const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const messageSchema = mongoose.Schema({
    sender_id:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    recipient_id:{
        type:Types.ObjectId,
        ref:'Product',
        required:true
    },
    content:{
        type:Types.Mixed,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('Message',messageSchema);