const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 9000;
const db = require('./config/mongoose');
const session = require('express-session')
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy')
const passportBase = require('./config/passport-base')
db()
//installing cors for cors 
const cors = require('cors')
app.use(cors())
//Normal POST from fetch
app.use(express.json())
//parser to add body key to requests with HTML Post
app.use(express.urlencoded())
//setting passport
app.use(passport.initialize());
//use routes
app.use('/',require('./routes'))

if(process.env.NODE_ENV ==="production"){
    
    app.use(express.static(path.join('client/build')));
    app.get("*", (req, res) => {
        let url = path.join(__dirname, '../client/build', 'index.html');
        if (!url.startsWith('/app/')) // since we're on local windows
            url = url.substring(1);
        res.sendFile(url);
      });
      
}

app.listen(port,(err)=>{
    if(err){
        console.log('error',err);
        return ;
    }
    console.log('Server is listening fine')
})