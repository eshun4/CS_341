const mongoose = require("mongoose");
var validate = require('mongoose-validator');
const ENVIRONMENT_VARIABLES = require("../../encryption/dotenv");

var collectionValidator = [{
    validator1:validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Class value must be between {ARGS[0]} and {ARGS[1]}',
    }),
    validator2:validate({
      validator: 'isLength',
      arguments: [1, 8],
      message: 'Year value must be between {ARGS[0]} and {ARGS[1]}',
    }),
    validator3:validate({
      validator: 'isLength',
      arguments: [1, 20],
      message: 'Semester value must be between {ARGS[0]} and {ARGS[1]}',
    }),
    validator4:validate({
      validator: 'isLength',
      arguments: [1, 30],
      message: 'Teacher value must be between {ARGS[0]} and {ARGS[1]}',
    }),
    validator5:validate({
      validator: 'isLength',
      arguments: [1, 40],
      message: 'School value must be between {ARGS[0]} and {ARGS[1]}',
    })
  }
    ]

const collectionSchema = new mongoose.Schema({
    class:{
        type: String,
        validate:collectionValidator[0].validator1,
        required:[true, "This field is required."]
    },
    year:{
        type:Number,
        required:[true, "This field is required."],
        validate:Number.isInteger
    },
    semester:{
      type:String,
      required:[true, "This field is required."],
      validate:collectionValidator[0].validator3
    },
    teacher:{
      type:String,
      required:[true, "This field is required."],
      validate:collectionValidator[0].validator4
    },
    school:{
      type:String,
      required:[true, "This field is required."],
      validate:collectionValidator[0].validator5
    },
    author :  [{
        type:mongoose.Types.ObjectId, 
        ref:ENVIRONMENT_VARIABLES.Database_Collection_1, }],
    cards: [{
        type:mongoose.Types.ObjectId, 
        ref:ENVIRONMENT_VARIABLES.Database_Collection_2, }],
    belongsToFolder: [{
          type:mongoose.Types.ObjectId, 
          ref:ENVIRONMENT_VARIABLES.Database_Collection_4, }],
},
{
  timestamps: true,
});


module.exports = collectionSchema;

