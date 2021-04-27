const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    collegeName:{
        type: String,
        required: true
    },
    yearGrad:{
        type: String,
        required:true

    },
    city:{
        type: String,
        required:true
    }

},{
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;