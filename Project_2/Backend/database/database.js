const mongoose = require("mongoose");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");

const URI = ENVIRONMENT_VARIABLES.Database_URI
const dbName = ENVIRONMENT_VARIABLES.Database_Name;

async function connect(){
    const db =  mongoose.connect(URI + "/"+ dbName + "?retryWrites=true", {useNewUrlParser:true});
    console.log('Connected successfully to server');
    return db;
}
 

module.exports = connect;