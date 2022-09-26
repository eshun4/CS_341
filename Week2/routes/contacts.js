const express = require("express");
const contactsRouter = express.Router();
const connect = require('../database/db');
const contacts = require('../contacts.json');

const dotenv = require('dotenv');
dotenv.config({path: "../.env" });

const EventEmitter = require('events');
const { ObjectId } = require("mongodb");

const myEvent = new EventEmitter();

myEvent.on('test-event', (data) => {
    console.log("Test Event Fired!");
    console.log(data);
});

contactsRouter.route('/')
.get(async(req, res)=>{
    const db = await connect();
    const contacts = await db.collection(process.env.DB_COLLECTION).find().toArray();
    myEvent.emit("test-event", contacts);
    res.send(contacts);
}).post(async(req, res)=>{
    console.log(contacts);
    res.json({contacts: "Contacts are stored.", Kofi_contacts: contacts});
    const db = await connect();
    db.collection(process.env.DB_COLLECTION).insertMany(contacts);
});

contactsRouter.get('/:id', async(req, res)=>{
    // console.log(req.params);
    const db = await connect();
    // const contacts = await db.collection(process.env.DB_COLLECTION).findOne().toArray();
    const contacts = await db.collection(process.env.DB_COLLECTION).find({"_id" : ObjectId(req.params.id)}).toArray();
    console.log(contacts);
    res.send(contacts);
    console.log('Single contact of ID: ' + req.params.id);
});

// contactsRouter.route(':/id').patch( (req, res)=>{
//     // console.log(req.params);
//     res.send('Single book of ID: ' + req.params.id + 'to update.');
// }).delete( (req, res)=>{
//     // console.log(req.params);
//     res.send('Single book of ID: ' + req.params.id + 'to update.');
// });

  // To handle any other rout
  contactsRouter.all("/*", (req,res) => {
    res.send("Page not found");
});
//Once you make the export below you can use al the routes from here in your main.js file
module.exports = contactsRouter;