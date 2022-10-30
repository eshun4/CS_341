const express = require("express");
const usersRouter = express.Router();
const mongoose = require("mongoose");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
const userCont = require("../controllers/user");
const authCont = require("../controllers/auth");
const cardRouter = require('../routes/card');
const collectionRouter = require('../routes/collection');
const folderRouter = require('../routes/folder');
const userSchema = require('../models/schemas/User');
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mysecret = ENVIRONMENT_VARIABLES.Database_SECRET
const profileRouter = require("../routes/profile");

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : mysecret
},
  authCont.JWT
));


usersRouter.use(session({ 
  secret:mysecret,
  resave: false,
  saveUninitialized: false,
 //Remember to set this to false 
}));

usersRouter.use(passport.initialize());
usersRouter.use(passport.session());


userSchema.plugin(passportLocalMongoose, {selectFields : 'username first_name last_name createdAT'});
userSchema.plugin(findOrCreate);
const User = new mongoose.model(ENVIRONMENT_VARIABLES.Database_Collection_1, userSchema);

passport.use(User.createStrategy())
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: ENVIRONMENT_VARIABLES.Database_GOOGLE_CLIENT_ID,
  clientSecret: ENVIRONMENT_VARIABLES.Database_GOOGLE_CLIENT_SECRET,
  callbackURL: ENVIRONMENT_VARIABLES.Database_GOOGLE_REDIRECT_URI,

},
  authCont.GoogleStrategy
));




usersRouter.use('/', require('../swagger/swagger'));
usersRouter.use("/card",passport.authenticate('jwt', {session: false}), cardRouter);
usersRouter.use("/folder",passport.authenticate('jwt', {session: false}), folderRouter);
usersRouter.use("/collection",passport.authenticate('jwt', {session: false}), collectionRouter);
usersRouter.use("/users",passport.authenticate('jwt', {session: false}), profileRouter);

usersRouter.route("/").get(userCont.home);
usersRouter.get("/dashboard", userCont.dashBoard);
//Login user
usersRouter.route("/login").post(authCont.login);
 //Logout user
usersRouter.route("/logout").get(authCont.logout)
//Register user
usersRouter.route("/register").post(authCont.register);
usersRouter.get('/google', authCont.googleSignIn);

// usersRouter.get('/google/acemastery', authCont.googleRedirect );



module.exports = userSchema;
module.exports = usersRouter;
