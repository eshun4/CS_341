const express = require("express");
const usersRouter = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
const userCont = require("../controllers/user");
const authCont = require("../controllers/auth");
const cardRouter = require('../routes/card');
const userSchema = require('../models/schemas/User');






usersRouter.use('/', require('../swagger/swagger'));
usersRouter.use("/card", cardRouter);
//Login user
usersRouter.route("/users/:first_name").get(userCont.byName);
usersRouter.route("/users/profile/:id").post(authCont.profile);
 //Logout user
usersRouter.route("/users").get(userCont.allUsers)
usersRouter.route("/").get(userCont.home);


const mysecret = process.env.SECRET
usersRouter.use(session({ 
    secret:mysecret,
    resave:false,
    saveUninitialized:true, //Remember to set this to false 
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
