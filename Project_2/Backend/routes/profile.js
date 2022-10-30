const express = require("express");
const profileRouter = express.Router();
const profileCont = require("../controllers/profile");
const userCont = require("../controllers/user");
const passport = require('passport');


profileRouter.route("/:first_name", passport.authenticate('jwt', {session: false})).get(userCont.byName);
profileRouter.route("/profile/:id",passport.authenticate('jwt', {session: false})).post(profileCont.profile).get(profileCont.getProfile).put(profileCont.updateProfile).delete(profileCont.deleteProfile);
profileRouter.route("/",passport.authenticate('jwt', {session: false})).get(userCont.allUsers)
module.exports = profileRouter;