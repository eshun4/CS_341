const connect = require('../database/database');
const collectionSchema = require("../models/schemas/collection");
const convertError = require("../utilities/handlers");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");
const { ObjectId } = require("mongodb");


///Creates a single Collection
exports.createCollection = (async(req, res)=>{
    try{
        var db = await connect();
        var Collection = db.model(ENVIRONMENT_VARIABLES.Database_Collection_3, collectionSchema);
        const collection =new Collection({
            class:req.body.class,
            year:req.body.year,
            semester: req.body.semester ,
            teacher: req.body.teacher,
            school: req.body.school,
            });
            collection.save((err, collection)=>{
        if(err){
            res.status(500).send(convertError(err.errors));
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(
                collection);
        }  
    });
    }catch(err){
        res.status(500).send(err.message);
    }
});

///Gets a Single Collection
exports.getCollection = (async(req,res)=>{
    try{
        var db = await connect();
        var Collection = db.model(ENVIRONMENT_VARIABLES.Database_Collection_3, collectionSchema);
        Collection.find({_id:ObjectId(req.params),}, {},  function(err, collection){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(collection);
        }
            });
    }catch(e){
        res.status(500).send(e.message);
    }
    
});
///Deletes a Single Collection
exports.deleteCollection = (async(req,res)=>{
    try{
        var db = await connect();
        var Collection = db.model(ENVIRONMENT_VARIABLES.Database_Collection_3, collectionSchema);
        Collection.findOneAndDelete({ _id: ObjectId(req.params.id )}, (err, collection)=>{
        if(err){
            res.status(500).send(convertError(err.errors));
        }else{
        res.send({message: "Delete was successful."});
        }
    });
    }catch(e){
        res.status(500).send(e.message);
    }
    
});
///Updates a single colelction
exports.updateCollection = (async(req,res)=>{
    try{
    var db = await connect();
    var Collection = db.model(ENVIRONMENT_VARIABLES.Database_Collection_3, collectionSchema);
    Collection.findByIdAndUpdate({ _id: ObjectId(req.params)}, { $set: {  class:req.body.class,
        year:req.body.year,
        semester: req.body.semester ,
        teacher: req.body.teacher,
        school: req.body.school, }}, (err, collection)=>{
        if(err){
            res.send(convertError(err.errors));
        }else{
            res.status(500).sendStatus(200);
        }
    });
    }catch(e){
        res.status(500).send(e.message);
    }
    
});

///Gets all collections
exports.getALL =(async(req,res)=>{
    try{
    var db = await connect();
    var Collection = db.model(ENVIRONMENT_VARIABLES.Database_Collection_3, collectionSchema);
    Collection.find({}, (err,collection)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(collection);
        }
    })
    }catch(e){
        res.status(500).send(e.message);
    }
    
})
