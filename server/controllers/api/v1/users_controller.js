const User = require('../../../models/user')
const jwt = require('jsonwebtoken');
const Songs = require('../../../models/songs');
const Artists = require('../../../models/artists');
const mongoose = require('mongoose')
module.exports.createSession = async (req,res)=>{
    try{
        
        //Find user and issue jwt
        let user = await User.findOne({email:req.body.email}).populate('favourites');
      
        if(!user||req.body.password!=user.password){
            
            return res.json(422,{
                message:'Invalid Email/Password'
            })
        }
        else{
            return res.json(200,{
                data:{
                    token:jwt.sign(user.toJSON(),`${process.env.KEY}`,{expiresIn:'10000000'})
                },
                message:'Signed in successfully'
            })
        }
    }catch(err){
        console.log('****Error in createSession: ',err)
        return res.json(500,{
            message:'Internal Server error'
        })
    }
    
}

module.exports.createUser = async (req,res)=>{
    try{
        //First check if he exists
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.json(400,{
                message:'You already exist, please sign in'
            })
        }
        else{
            let newUser = await User.create({...req.body,avatar:process.env.DEFAULT_AVATAR})
            if(newUser){
                return res.json(200,{
                    data:{
                        token:jwt.sign(newUser.toJSON(),`${process.env.KEY}`,{expiresIn:'10000000'})
                    },
                    message:'Signed Up successfully'
                })
            }
        }
    }catch(err){
        console.log('***error in creating user',err)
        return res.json(500,{
            message:`${err}`
        })
    }
}

module.exports.createSong = async (req,res)=>{
   
    try{

        let song = await Songs.create({
            ...req.body,
            songURL:req.body.song,
            imageURL:req.body.img
        })
        return res.json(200,{
            data:song,
            message:'Song created successfully'
        })
    }catch(err){
        
        return res.json(400,{
            message:`Error ${err}`
        })
    }
}

module.exports.createArtist = async (req,res)=>{
   
    try{

        let artist = await Artists.create({
            ...req.body,
            imageURL:req.body.img
        })
        return res.json(200,{
            data:artist,
            message:'Artist created successfully'
        })
    }catch(err){
        
        return res.json(400,{
            message:`Error ${err}`
        })
    }
}

module.exports.favourite = async (req,res)=>{
    try{
        console.log('req.body',req.body)
        let user = await User.findOne({email:req.user.email});
        user.favourites.push(req.body);
        await user.save()
        let updatedUser = await User.findOne({email:req.user.email}).populate('favourites')
        return res.json(200,{
            data:{
                token:jwt.sign(updatedUser.toJSON(),`${process.env.KEY}`,{expiresIn:'10000000'})
            },
            message:'Favourited successfully'
        })
    }catch(err){
        console.log('**error in favouriting a song',err)
        return res.json(500,{
            message:err
        })
    }
}

module.exports.unfavourite = async (req,res)=>{
    try{
        
        let updatedUser = await User.findByIdAndUpdate(req.user.id,{$pull:{favourites: mongoose.Types.ObjectId(req.body._id)}},{new:true}).populate('favourites')
        console.log('ab hai',updatedUser)
        return res.json(200,{
            data:{
                token:jwt.sign(updatedUser.toJSON(),`${process.env.KEY}`,{expiresIn:'10000000'})
            },
            message:'Unavourited successfully'
        })
    }catch(err){
        console.log('**error in unfavouriting a song',err)
        return res.json(500,{
            message:err
        })
    }
}

module.exports.updateDetails = async(req,res)=>{
    try {
        console.log('req.body is',req.body)
        let user = await User.findOne({email:req.user.email}).populate('favourites')
        user.name = req.body.name;
        user.password = req.body.password;
        if(req.body.img){
            user.avatar = req.body.img;
        }
        await user.save();
        return res.json(200,{
            data:{
                token:jwt.sign(user.toJSON(),`${process.env.KEY}`,{expiresIn:'10000000'})
            },
            message:'Updated user successfully'
        })

    }catch(err){
        console.log('**error in updating user',err)
        return res.json(500,{
            message:err
        })
    }
}