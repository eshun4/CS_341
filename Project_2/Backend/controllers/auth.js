const connect = require('../database/database');
const { ObjectId } = require("mongodb");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");
const convertError = require("../utilities/handlers");
const passport = require('passport');
const userSchema= require("../models/schemas/User");
const profileSchema= require("../models/schemas/profile");
const jwt = require('jsonwebtoken');


//JWT Strategy
exports.JWT = async function (jwtPayload, cb) {
        var db = await connect();
        var User =db.model(ENVIRONMENT_VARIABLES.Database_Collection_1, userSchema);  
       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
       return User.findOne(jwtPayload.id)
          .then(user => {

              return cb(null, user);
          })
          .catch(err => {
              return cb(err);
        });
}



//Google Strategy
exports.GoogleStrategy = async function(accessToken, refreshToken, profile, done) {
    var db = await connect();    
    db.model(ENVIRONMENT_VARIABLES.Database_Collection_1, userSchema).findOrCreate({ googleId: profile.id, username:profile.emails[0].value, 
    }, function (err, user) {
        var use = ({
            id:user.id,
            username:user.username,
            profile:profile._json,
            token:accessToken
        });
      if(err){
        console.log(err.message)
      }
      return done(err,use,use.token);
    });
  }

  
// Google sign in
exports.googleSignIn = passport.authenticate('google', {session: true, scope: ['profile', 'email' ] ,successRedirect : '/dashboard', accessType:'offline' });





// User Schema
exports.register = (async(req, res)=>{
    var db = await connect();
    var User = db.model(ENVIRONMENT_VARIABLES.Database_Collection_1, userSchema);
    const registeringUser =new User({
        username:req.body.username,
        password:req.body.password,
        });
    // var password = 
    User.register(registeringUser, registeringUser.password, function(err, user){
        if(err){
            if(!err.errors){
                res.status(500).send(err);
            }
            else{
                res.status(500).send(convertError(err.errors));
            }
        }else{
            passport.authenticate("local",)(req,res, function(){
                const token = jwt.sign(user.toJSON(), ENVIRONMENT_VARIABLES.Database_SECRET, {
                    expiresIn: "730h"
                } );
                return res.status(201).json({
                    user, 
                    success: true,
                    token: 'bearer ' + token, });
            });
        }
    });
});

//login Schema
exports.login= (async(req, res)=>{
    var db =  await connect();
    var User = db.model(ENVIRONMENT_VARIABLES.Database_Collection_1, userSchema);

    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), ENVIRONMENT_VARIABLES.Database_SECRET, {
                expiresIn: "730h"
            });

            return res.status(200).json({
                user, 
                success: true,
                token: 'bearer ' + token, });
        });
    })
    (req, res);
});

//logout
exports.logout = (async(req,res)=>{
    req.logout((err, response)=>{
        if(err){
            res.status(200).send(err);
        }else{
            res.send({message:"Logout Successful."});
        }
    });
    
});

