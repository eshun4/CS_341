const mongoose = require("mongoose");
var validate = require('mongoose-validator');
const ENVIRONMENT_VARIABLES = require("../../encryption/dotenv");

var cardValidator = [{
    validator1:validate({
      validator: 'isLength',
      arguments: [3, 200],
      message: 'Question must be between {ARGS[0]} and {ARGS[1]}',
    }),
    validator2:validate({
      validator: 'isLength',
      arguments: [3, 400],
      message: 'Answer must be between {ARGS[0]} and {ARGS[1]}',
    }),
  }
    ]

const cardSchema = new mongoose.Schema({
    question : {
        type:String, 
        required:[true, "Question is Required."],
        validate:[cardValidator[0].validator1] ,},
    answer: {
        type:String, 
        required:[true, "Answer is Required."],
        validate:[cardValidator[0].validator2] ,},
    hints_notes: {
      type:String,
    },
    belongsToCollection: [{
      type:mongoose.Types.ObjectId, 
      ref:ENVIRONMENT_VARIABLES.Database_Collection_3}],
    created_by: [{
      type:mongoose.Types.ObjectId, 
      ref:ENVIRONMENT_VARIABLES.Database_Collection_1}],
},
{
  timestamps: true,
});


module.exports = cardSchema;
