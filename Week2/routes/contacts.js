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

//Once you make the export below you can use al the routes from here in your main.js file
module.exports = contactsRouter;