const express = require("express");
const contactsRouter = express.Router();

const dotenv = require('dotenv');
dotenv.config({path: "../.env" });
const EventEmitter = require('events');

const ContactsController = require("../controllers/contactscontroller");
const myEvent = new EventEmitter();


myEvent.on('test-event', (data) => {
    console.log("Test Event Fired!");
    console.log(data);
});

contactsRouter.route('/addcontact').post(ContactsController.store);
contactsRouter.route('/').get(ContactsController.findAll).post(ContactsController.storeMany);
contactsRouter.route('/:id').get(ContactsController.findbyID).put(ContactsController.updateBYID).delete(ContactsController.delete);


  // To handle any other rout
  contactsRouter.all("/*", (req,res) => {
    res.send("Welcome to the HomePage.");
});
//Once you make the export below you can use al the routes from here in your main.js file
module.exports = contactsRouter;


// .get(async(req, res)=>{
//     const db = await connect();
//     const contacts = await db.collection(process.env.DB_COLLECTION).find().toArray();
//     myEvent.emit("test-event", contacts);
//     res.send(contacts);
// })

// contactsRouter.get('/:id', async(req, res)=>{
//     // console.log(req.params);
//     const db = await connect();
//     // const contacts = await db.collection(process.env.DB_COLLECTION).findOne().toArray();
//     const contacts = await db.collection(process.env.DB_COLLECTION).find({"_id" : ObjectId(req.params.id)}).toArray();
//     console.log(contacts);
//     res.send(contacts);
//     console.log('Single contact of ID: ' + req.params.id);
// });
