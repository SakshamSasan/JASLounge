const mongoose = require('mongoose');
const ArtistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const Artists = mongoose.model('Artists',ArtistSchema);
module.exports = Artists;