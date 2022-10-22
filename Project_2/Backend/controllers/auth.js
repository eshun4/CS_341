const connect = require('../database/database');
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });
const convertError = require("../utilities/handlers");
const passport = require('passport');
const userSchema= require("../models/schemas/User");
const profileSchema= require("../models/schemas/profile");
var ID;

// Upload current user's profile
exports.profile = (
    async(req, res)=>{
        var db = await connect();
        var Profile = db.model(process.env.DB_COLLECTION_5, profileSchema);
        var User = db.model(process.env.DB_COLLECTION_1, userSchema);
        User.find({_id:ObjectId(req.params)},{},function (err, users) {
            var profile = new Profile({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                user: users
            });
            var profile = profile.save((err, user)=>{
                if(!err){
                     res.status(200).send(user);
                     console.log(user);
                    }else{
                    res.status(200).send(convertError(err.errors));
                }
            });
        });
        // Profile.findOne({_id:ObjectId("6354672dbb9b732456cf8e9b")},(err,user)=>{
        //     res.send(user);

        // }).populate(process.env.DB_COLLECTION_1);
        // res.send(profile);
        

});

// User Schema
exports.register = (async(req, res)=>{
    var db = await connect();
    var User = db.model(process.env.DB_COLLECTION_1, userSchema);
    const registeringUser =new User({
        username:req.body.username,
        password:req.body.password,
        });
    // var password = 
    User.register({username:registeringUser.username}, registeringUser.password, function(err, user){
        if(err){
            if(!err.errors){
                res.status(500).send(err.message);
            }
            else{
                res.status(500).send(convertError(err.errors));
            }
        }else{
            passport.authenticate("local")(req,res, function(){
                res.send(user);
            })
        }
    })
});

exports.login= (async(req, res)=>{
    var db =  await connect();
    var User = db.model(process.env.DB_COLLECTION_1, userSchema);

    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user, function(err){
        if(err){
            if(!err.errors){
                res.status(500).send(err.message);
            }
            else{
                res.status(500).send(convertError( err.errors));
            }
        }else{
            passport.authenticate("local")(req,res, function(){
                res.send({
                    username: user.username,
                    _id:ObjectId (user._id)
                });
            });
        }
    })
});

exports.logout = (async(req,res)=>{
    req.logout((err, response)=>{
        if(err){
            res.send(err.message);
        }else{
            res.send({message:"Logout Successful."});
        }
    });
    
});

