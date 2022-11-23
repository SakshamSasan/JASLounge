const Songs = require('../../../models/songs'); 
const Artists = require('../../../models/artists');
module.exports.homePage= async (req,res)=>{
    try{
        let songs = await Songs.find({})
        let andrew = await Songs.find({artist:'Top G'})
        let proper = await Songs.findOne({name:'Patola'})
        let daftar = await Songs.findOne({name:'Daftar'})
        let bewafa = await Songs.findOne({name:'Bewafa'})
        let work = await Songs.findOne({name:'Work'})
        let close = await Songs.findOne({name:'Close'})
        let hills = await Songs.findOne({name:'Hills'})
        let queue1 = [proper,daftar,bewafa,work,close,hills]
        let queue = andrew.concat(queue1)
        let latestPunjabi = songs.splice(41,6);
        let latestEnglish = songs.splice(41,6);
        return res.json(200,{
            queue,
            latestEnglish,
            latestPunjabi
        })

    }catch(err){
        return res.json(500,{
            message:`Error ${err}`
        })
    }
    
    
}
module.exports.artistPage = async (req,res)=>{

    let _name = req.params.name;
    try{
        let songs = await Songs.find({artist:_name})
        let artist = await Artists.findOne({name:_name})
        return res.json(200,{
            name:artist.name,
            img:artist.imageURL,
            content:artist.content,
            songs
        })
    }catch(err){
        console.log('***error in fetching artist page',err)
        return res.json(500,{
            message:err
        })
        
    }
}