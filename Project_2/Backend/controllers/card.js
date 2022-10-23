const connect = require('../database/database');
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const convertError = require("../utilities/handlers");
const cardSchema = require("../models/schemas/card");


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
            }
        );
        newCard.save((err, card)=>{
        if(err){
            res.status(500).send(convertError(err.errors));
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
        res.status(500).send(err.message);
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
                res.status(500).send({error: convertError(err.errors)});
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
                res.send(convertError(err.errors));
            }else{
                res.status(500).sendStatus(200);
            }
        });

    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
});

//This deletes a card by ID
exports.deleteById = (async(req, res)=>{
    try{
        var db =  await connect();
        var Card = db.model(process.env.DB_COLLECTION_2, cardSchema );
        var allCards = Card.findOneAndDelete({ _id: ObjectId(req.params.id )}, (err, card)=>{
            if(err){
                res.status(500).send(convertError(err.errors));
            }else{
            res.send({message: "Delete was successful."});
            }
        });

    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
});