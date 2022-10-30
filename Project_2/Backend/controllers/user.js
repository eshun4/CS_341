const connect = require('../database/database');
const profileSchema = require("../models/schemas/profile");
const convertError = require("../utilities/handlers");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");
const userSchema = require('../models/schemas/User');
const { ObjectId } = require("mongodb");

exports.dashBoard = (async(req,res)=>{
    if(req.isAuthenticated()){
        res.send(req.user);
    }else{
        res.send('/');
    }
});
// const userSchema = user.userSchema;
exports.home =(async(req, res)=>{
    res.send("Welcome to the homepage.");
});

//Users by firstname
exports.byName = (async(req, res)=>{
    try{
        var db =  await connect();
        var Profile = db.model(ENVIRONMENT_VARIABLES.Database_Collection_5, profileSchema);
        newUser = Profile.find({'first_name' : new RegExp(req.params.first_name, 'i')}, function(err, docs){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(docs);
        });
    }catch(err){
        res.send(err.message);
    }
});

//All users
exports.allUsers = (async(req, res)=>{
    try{
        var db =  await connect();
        var User= db.model(ENVIRONMENT_VARIABLES.Database_Collection_1, userSchema);
        newUser = await User.find({});
        res.send(newUser);
    }catch(err){
        res.send(err.message);
    }
});

