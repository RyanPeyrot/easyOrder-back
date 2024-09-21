const mongoose = require('mongoose');
const {Schema, Types} = require("mongoose");
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
        enum: ['artisan', 'client', 'admin'],
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
    categories: [{
        type: Types.ObjectId,
        ref: 'Category',
    }],
    profile_pic:{
        type:String,
        default: "https://res.cloudinary.com/dt1ksv65x/image/upload/v1726566963/profile_pictures/default_pic.png"
    },
    description: {
        type: String,
        default: ""
    },
    social_network: {
        instagram: {type: String},
        facebook: {type: String},
        tiktok: {type: String},
        youtube: {type: String}
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

// Fonction pour hacher le mot de passe
async function hashPassword(user, next) {
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
}

// Middleware `pre('save')` pour hacher le mot de passe lors de la sauvegarde
userSchema.pre('save', async function (next) {
    await hashPassword(this, next);
});

// Middleware `pre('findOneAndUpdate')` pour hacher le mot de passe lors de la mise à jour
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
        } catch (error) {
            return next(error);
        }
    }
    next();
});




// Méthode pour comparer le mot de passe en clair et le hashé
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User',userSchema);