const mongoose = require('mongoose');
const multer = require('multer')
const SongSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    songURL:{
        type:String,
        required:true
    }
},{timestamps:true})

const Songs = mongoose.model('Songs',SongSchema);
module.exports = Songs