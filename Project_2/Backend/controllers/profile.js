const userSchema = require('../models/schemas/User');
const { ObjectId } = require("mongodb");
const connect = require('../database/database');
const profileSchema = require("../models/schemas/profile");
const convertError = require("../utilities/handlers");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");

// Upload current user's profile
exports.profile = (
    async(req, res)=>{
        var db = await connect();
        var Profile = db.model(ENVIRONMENT_VARIABLES.Database_Collection_5, profileSchema);
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
});

exports.getProfile = (async(req,res)=>{
    var db = await connect();
    var Profile = db.model(ENVIRONMENT_VARIABLES.Database_Collection_5, profileSchema);
    var profile = Profile.findOne({_id:ObjectId(req.params)},(err,user)=>{
    res.status(200).send(user);

    }).populate(process.env.DB_COLLECTION_1);
});

exports.updateProfile =(async(req,res)=>{
    try{
        var db = await connect();
        var Profile = db.model(ENVIRONMENT_VARIABLES.Database_Collection_5, profileSchema);
        Profile.findByIdAndUpdate({ _id: ObjectId(req.params)},
        {$set: {  first_name:req.body.first_name,
                  last_name:req.body.last_name, }}, (err, profile)=>{
        if(err){
            res.send(convertError(err.errors));
        }else{
            res.status(500).sendStatus(200);
        }
    });
    }catch(e){
        res.status(500).send(e.message);
    }
});

exports.deleteProfile =(async(req,res)=>{
    try{
        var db = await connect();
        var Profile = db.model(ENVIRONMENT_VARIABLES.Database_Collection_5, profileSchema);
        Profile.findOneAndDelete({ _id: ObjectId(req.params.id )}, (err, profile)=>{
            if(err){
                res.status(500).send(convertError(err.errors));
            }else{
            res.send({message: "Delete was successful."});
            }
        });
        }catch(e){
            res.status(500).send(e.message);
        }
});