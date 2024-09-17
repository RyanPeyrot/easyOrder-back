const mongoose = require('mongoose');
const {Schema} = mongoose;

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = addressSchema;
