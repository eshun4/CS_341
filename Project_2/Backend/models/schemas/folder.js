const mongoose = require("mongoose");
var validate = require('mongoose-validator');
const ENVIRONMENT_VARIABLES = require("../../encryption/dotenv");

var folderValidator = [{
    validator1:validate({
      validator: 'isLength',
      arguments: [3, 40],
      message: 'Name value must be between {ARGS[0]} and {ARGS[1]}',
    }),
    validator2:validate({
      validator: 'isLength',
      arguments: [1, 100],
      message: 'Description value must be between {ARGS[0]} and {ARGS[1]}',
    }),
  }
    ]

const folderSchema = new mongoose.Schema({
    name:{
        type: String,
        validate:folderValidator[0].validator1,
        required:[true, "This field is required."]
    },
    description:{
      type:String,
      required:[true, "This field is required."],
      validate:folderValidator[0].validator2
    },
    collections :  [{
        type:mongoose.Types.ObjectId, 
        ref:ENVIRONMENT_VARIABLES.Database_Collection_3, }],
    created_by :  [{
        type:mongoose.Types.ObjectId, 
        ref:ENVIRONMENT_VARIABLES.Database_Collection_1, }],
},
{
  timestamps: true,
});


module.exports = folderSchema;

