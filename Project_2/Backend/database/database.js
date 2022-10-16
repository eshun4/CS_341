const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });

const URI = process.env.DB_URI
const dbName = process.env.DB_NAME;

async function connect(){
    const db =  mongoose.connect(URI + "/"+ dbName + "?retryWrites=true", {useNewUrlParser:true});
    console.log('Connected successfully to server');
    return db;
}
 

module.exports = connect;