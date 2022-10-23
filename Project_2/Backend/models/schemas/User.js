const mongoose = require("mongoose");
const profileSchema = require("../schemas/profile");
var validate = require('mongoose-validator');
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });

var usernameValidator = [{
  validator1:validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Username value is required and must be between {ARGS[0]} and {ARGS[1]}',
  }),
  validator2:validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Password value is required and must be between {ARGS[0]} and {ARGS[1]}',
  })
}
  ]
   
const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required:[true, "Username is Required."],
        validate:usernameValidator[0].validator1 ,},
    password :{
        type:String, 
        min: [6, 'Must be at least , got {VALUE}'],
        max: 20,
        validate:usernameValidator[0].validator2,},
        profile: {
          type:mongoose.Types.ObjectId, 
          ref:process.env.DB_COLLECTION_5}
},
{
  timestamps: true,
});

module.exports = userSchema;