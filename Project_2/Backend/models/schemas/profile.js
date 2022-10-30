const mongoose = require("mongoose");
const ENVIRONMENT_VARIABLES = require("../../encryption/dotenv");

const profileSchema = new mongoose.Schema({
    first_name :{
        type:String, 
        required:[true, "Firstname is required."]},
    last_name : {
        type:String, 
        required:[true, "Lastname is required."]},
    user: [{
            type:mongoose.Types.ObjectId, 
            ref:ENVIRONMENT_VARIABLES.Database_Collection_1, }]
},{
    timestamps: true,
  });

// module.exports = mongoose.model(process.env.DB_COLLECTION_5, profileSchema);
module.exports = profileSchema;