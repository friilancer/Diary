const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const secretSchema = require('./secrets')

//User Schema
const UserSchema = new Schema({
    name : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
    secrets: [secretSchema],
    registerDate :{
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('User', UserSchema);
