const mongoose = require("mongoose");
var validate = require('mongoose-validator');
const bcrypt = require("bcrypt");
const ENVIRONMENT_VARIABLES = require("../../encryption/dotenv");
var saltRounds = parseInt(ENVIRONMENT_VARIABLES.Database_SALT_ROUNDS);

var usernameValidator = [{
  validator1:validate({
    validator: 'isLength',
    arguments: [3, 15],
    message: 'Username must be between {ARGS[0]} and {ARGS[1]}',
  }),
  validator2:validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Password must be between {ARGS[0]} and {ARGS[1]}',
  }),
  validator3:validate({
    validator: 'isEmail',
    message: 'Email is Invalid.',
  }),
}
  ]

   
const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required:[true, "Username is Required."],
        validate:usernameValidator[0].validator3 ,},
    password :{
        type:String, 
        validate:usernameValidator[0].validator2,},
    profile: [{
      type:mongoose.Types.ObjectId, 
      ref:ENVIRONMENT_VARIABLES.Database_Collection_5}]
},
{
  timestamps: true,
});

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});



module.exports = userSchema;