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
const userCont = require("../controllers/user");
const authCont = require("../controllers/auth");
const cardRouter = require('../routes/card');

usersRouter.use('/', require('../swagger/swagger'));
usersRouter.use("/card", cardRouter);
//Login user
usersRouter.route("/users/:first_name").get(userCont.byName);
 //Logout user
usersRouter.route("/users").get(userCont.allUsers)
usersRouter.route("/").get(userCont.home);





const userSchema = new mongoose.Schema({
    username: String,
    password :String,
    first_name :String,
    last_name : String,
    createdAt: ""
});

const mysecret = process.env.SECRET
usersRouter.use(session({ 
    secret:mysecret,
    resave:false,
    saveUninitialized:true,
}));

usersRouter.use(passport.initialize());
usersRouter.use(passport.session());


userSchema.plugin(passportLocalMongoose, {selectFields : 'username first_name last_name createdAT'});
const User = new mongoose.model(process.env.DB_COLLECTION_1, userSchema);

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Login user
usersRouter.route("/login").post(authCont.login);
 //Logout user
usersRouter.route("/logout").get(authCont.logout)

//Register user
usersRouter.route("/register").post(authCont.register);

module.exports = userSchema;
module.exports = usersRouter;