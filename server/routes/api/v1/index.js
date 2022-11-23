const express = require('express');
const passport = require('passport');
const router = express.Router();
const home_controller = require('../../../controllers/api/v1/home_controller')
const users_controller = require('../../../controllers/api/v1/users_controller')

router.post('/signin',users_controller.createSession)
router.post('/signup',users_controller.createUser)
router.get('/home',passport.authenticate('jwt',{session:false}),home_controller.homePage)
router.get('/artist/:name',passport.authenticate('jwt',{session:false}),home_controller.artistPage)
router.post('/favourite',passport.authenticate('jwt',{session:false}),users_controller.favourite)
router.post('/unfavourite',passport.authenticate('jwt',{session:false}),users_controller.unfavourite)
router.post('/avatar',passport.authenticate('jwt',{session:false}),users_controller.updateDetails)
router.post('/songs',users_controller.createSong)
router.post('/artists',users_controller.createArtist)
module.exports = router