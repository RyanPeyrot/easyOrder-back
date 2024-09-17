const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required :true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['artisant','client'],
        default: 'client'
    },
    company:{
        type:String,
    },
    subscriber:{
        type:Boolean,
        required:true,
        default : false
    },
    rating:{
      type:Number,
      default : -1
    },
    profile_pic:{
        type:String,
        default:"https://res.cloudinary.com/dt1ksv65x/image/upload/v1726566963/default_pic.png"
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

module.exports = mongoose.model('User',userSchema);