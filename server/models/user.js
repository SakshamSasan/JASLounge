const mongoose = require('mongoose');
const Songs = require('./songs')
const multer = require('multer')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    favourites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Songs'
        }
    ]
},{timestamps:true})

const User = mongoose.model('User',UserSchema);
module.exports = User