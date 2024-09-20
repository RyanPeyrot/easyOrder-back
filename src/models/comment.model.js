const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");

const commentSchema = new Schema({
    sender_id:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    recipient_id:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String
    },
    rate:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment',commentSchema);