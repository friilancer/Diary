const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
    note : {
        type : String
    },
    date :{
        type: Date,
        default: Date.now
    }
 });

module.exports = SecretSchema;