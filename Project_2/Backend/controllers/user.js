const connect = require('../database/database');
const user = require("../routes/user");
const mongoose = require("mongoose");
const userSchema = require("../models/schemas/User");
const profileSchema = require("../models/schemas/profile");
const convertError = require("../utilities/handlers");

// const userSchema = user.userSchema;
exports.home =(async(req, res)=>{
    res.send("Welcome to the homepage.");
});

//Users by firstname
exports.byName = (async(req, res)=>{
    try{
        var db =  await connect();
        var Profile = db.model(process.env.DB_COLLECTION_5, profileSchema);
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
        var Profile = db.model(process.env.DB_COLLECTION_5, profileSchema);
        newUser = await Profile.find({});
        res.send(newUser);
    }catch(err){
        res.send(err.message);
    }
});