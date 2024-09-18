const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const bcrypt = require('bcrypt');
const {companySchema} = require("./company.model");

const userSchema = new Schema({
    stripe_id: {
        type: String
    },
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
        enum: ['artisan', 'client'],
        default: 'client'
    },
    company: companySchema,
    subscriber:{
        type:Boolean,
        required:true,
        default : false
    },
    rating:{
      type:Number,
      default : -1
    },
    rate_amount:{
        type:Number,
        default:0
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

userSchema.pre('save', async function (next) {
    const user = this;

    // Vérifier si le mot de passe a été modifié (ou nouvellement créé)
    if (!user.isModified('password')) {
        return next();
    }

    //Génère le mot de passe hashé
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Méthode pour comparer le mot de passe en clair et le hashé
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User',userSchema);