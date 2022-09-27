const connect = require('../database/db');
const contacts = require('../contacts.json');
const { ObjectId } = require("mongodb");

exports.findAll= async(req, res)=>{
    const db = await connect();
    const contacts = await db.collection(process.env.DB_COLLECTION).find().toArray();
    // myEvent.emit("test-event", books);
    res.send(contacts);
}

exports.store = async(req, res)=>{
    console.log(JSON.stringify(req.body));
    res.json(req.body);
    const db = await connect();
    db.collection(process.env.DB_COLLECTION).insertOne(req.body);
}

exports.storeMany = async(req, res)=>{
    console.log(contacts);
    res.json({contacts: "Contacts are stored.", Kofi_contacts: contacts});
    const db = await connect();
    db.collection(process.env.DB_COLLECTION).insertMany(contacts);
}

exports.findbyID = async(req, res)=>{
    const _id = ObjectId(req.params.id);
    const db = await connect();
    const contact = await db.collection(process.env.DB_COLLECTION).find({_id}).toArray();
    res.json(contact);
}

// exports.updateBYID = async(req, res)=>{
//     const _id = ObjectId(req.params.id);
//     const db = await connect();
//     await db.collection(process.env.DB_COLLECTION).updateOne({_id}, {$set:req.body});
//     res.json({data: "Contact is updated."});
// }

exports.delete = async(req, res)=>{
    // console.log(req.params);
    const _id = ObjectId(req.params.id);
    const db = await connect();
    db.collection(process.env.DB_COLLECTION).deleteOne({_id});
    res.json({data: "Contact is deleted."});
}