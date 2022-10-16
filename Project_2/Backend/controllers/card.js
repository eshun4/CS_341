const connect = require('../database/database');
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
var newDate = new Date();

const cardSchema = new mongoose.Schema({
    question : String,
    answer: String,
    hints_notes: String,
    createdAt: String
});



//This is to create a card
exports.create = (async(req, res)=>{
    try{
        var db =  await connect();
        var Card = db.model(process.env.DB_COLLECTION_2, cardSchema );
        const newCard = new Card(
            {
                question: req.body.question,
                answer: req.body.answer,
                hints_notes: req.body.hints_notes,
                createdAt: newDate.toLocaleString(),
            }
        );
        newCard.save((err, card)=>{
        if(err){
            res.send(err.message);
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send({
                question: card.question,
                answer: card.answer,
                hints_notes: card.hints_notes,
                createdAt: card.createdAt,
                "_id": card._id,});
        }  
    });
    }catch(err){
        res.send(err.message);
    }
});

//This finds by a card by id
exports.findCard = (async(req, res)=>{
    try{
        var db =  await connect();
        var Card = db.model(process.env.DB_COLLECTION_2, cardSchema );
        Card.findOne({_id:ObjectId(req.params.id)}, async(err, card)=>{
            if(err){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: err.message});
            }else{
                res.send(card);
            }
            }
        );
    } catch(e){
        console.log(e);
        res.send(e.message);
    }
});

//This updates a card by id
exports.updatebyID = (async(req, res)=>{
    try{
        var db =  await connect();
        var Card = db.model(process.env.DB_COLLECTION_2, cardSchema );
        var allCards = Card.findByIdAndUpdate({ _id: ObjectId(req.params.id)}, { $set: { question: req.body.question,
            answer: req.body.answer,
            hints_notes: req.body.hints_notes, }}, (err, newcard)=>{
            if(err){
                res.send(err.message);
            }else{
                res.sendStatus(200);
            }
        });

    }catch(e){
        console.log(e);
        res.send(e.message);
    }
});

//This deletes a card by ID
exports.deleteById = (async(req, res)=>{
    try{
        var db =  await connect();
        var Card = db.model(process.env.DB_COLLECTION_2, cardSchema );
        var allCards = Card.findOneAndDelete({ _id: ObjectId(req.params.id )}, (err, card)=>{
            if(err){
                res.send(err.message);
            }else{
            res.send({message: "Delete was successful."});
            }
        });

    }catch(e){
        console.log(e);
        res.send(e.message);
    }
});