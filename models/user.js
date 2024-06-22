const { required } = require("joi");
const mongoose = require("mongoose"); // mongoose require
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email:{
        type:String,
        required: true
    }
})
userSchema.plugin(passportLocalMongoose);//Automatic impliment username, salting , hashing in mongoose 

module.exports = mongoose.model('User', userSchema);