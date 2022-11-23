const passport = require('passport');
const User = require('../models/user');

passport.checkAuthentication = function(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }

    //if user not authenticated
    return res.redirect('/users/signin')
}

module.exports = passport