const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv").config({ path: "../.env" });


// Connection URL
const URI = process.env.DB_URI;
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Database Name
const dbName = process.env.DB_NAME;

async function connect(){
    await client.connect();
    console.log('Connected successfully to server');
    const db = await client.db(dbName);
    return db;
}

module.exports = connect;