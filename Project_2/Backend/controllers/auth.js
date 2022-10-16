const express = require("express");
const usersRouter = express.Router();
const connect = require('../database/database');
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
var newDate = new Date();
var datetime =  newDate.toLocaleString();
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
const userCont = require("./user");
const userSc = require("../routes/user");

const schema = userSc.userSchema;


// // mongoose.set('useCreateIndex', true);
// //Homepage route
// usersRouter.route("/").get(userCont.home);
// //Get all users route
// // usersRouter.route("/users").get(userCont.allUsers);

// User Schema
exports.register = (async(req, res)=>{
    var db = await connect();
    var User = db.model(process.env.DB_COLLECTION_1, schema);
    User.register(new User({
        username:req.body.username,
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        createdAt: newDate.toLocaleTimeString()}), req.body.password, function(err, user){
        if(err){
            console.log(err.message);
            res.send(err.message);
        }else{
            passport.authenticate("local")(req,res, function(){
                res.send(user);
            })
        }
    })
    // newUser.save((err, user)=>{
    //     if(err){
    //         res.send(err.message);
    //     }else{
    //         res.setHeader('Content-Type', 'application/json');
    //         res.send({
    //             "email": user.email,
    //             "first_name": user.first_name,
    //             "last_name": user.last_name,
    //             "createdAt": user.createdAt,
    //             "_id": user._id,
    //             "password":user.password});
    //     }  
    // });
});

exports.login= (async(req, res)=>{
    var db =  await connect();
    var User = db.model(process.env.DB_COLLECTION_1, schema);

    const user = new User({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err.message);
            res.send(err);
        }else{
            passport.authenticate("local")(req,res, function(){
                res.send({
                    username: user.username,
                    _id:ObjectId (user._id)
                });
            });
        }
    })
    // const email = req.body.email;
    // const password = md5(req.body.password);
    // User.findOne({email}, async(err, user)=>{
    //     if(err){
    //         res.send({error: err.message, message: "Incorrect/Invalid password or email."});
    //     }else{
    //         if(user){
    //             if(user.password == password){
    //                 res.json({user:{
    //                     "email":user.email,
    //                     "password": user.password
    //                 }
    //             });
    //         }
    //     }
    //     }
    // });
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

