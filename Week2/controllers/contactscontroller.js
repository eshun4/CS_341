const connect = require('../database/db');
const contacts = require('../contacts.json');
const { ObjectId } = require("mongodb");

exports.findAll= async(req, res)=>{
    const db = await connect();
    const contacts = await db.collection(process.env.DB_COLLECTION).find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({contacts});
}

exports.store = async(req, res)=>{
    console.log(JSON.stringify(req.body));
    const db = await connect();
    db.collection(process.env.DB_COLLECTION).insertOne(req.body);
    res.status(201).json(req.body);
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
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({contact});
      
}

exports.updateBYID = async(req, res)=>{
    const _id = ObjectId(req.params.id);
    const db = await connect();
    const response = await db.collection(process.env.DB_COLLECTION).updateOne({_id}, {$set:req.body});
    res.status(200).json({data: "Contact is Updated."});
}

exports.delete = async(req, res)=>{
    // console.log(req.params);
    const _id = ObjectId(req.params.id);
    const db = await connect();
    db.collection(process.env.DB_COLLECTION).deleteOne({_id});
    res.status(200).json({data: "Contact is Deleted."});
}