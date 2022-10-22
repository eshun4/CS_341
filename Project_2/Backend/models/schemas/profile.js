const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });

const profileSchema = new mongoose.Schema({
    first_name :{
        type:String, 
        required:[true, "Firstname is required."]},
    last_name : {
        type:String, 
        required:[true, "Lastname is required."]},
        user: [{
            type:mongoose.Types.ObjectId, 
            ref:process.env.DB_COLLECTION_1, }]
},{
    timestamps: true,
  });

module.exports = mongoose.model(process.env.DB_COLLECTION_5, profileSchema);
module.exports = profileSchema;