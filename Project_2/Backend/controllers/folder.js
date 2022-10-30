const connect = require('../database/database');
const folderSchema = require("../models/schemas/folder");
const convertError = require("../utilities/handlers");
const ENVIRONMENT_VARIABLES = require("../encryption/dotenv");
const { ObjectId } = require("mongodb");

///Creates a single folder
exports.createFolder = (async(req, res)=>{
    try{
        var db = await connect();
        var Folder = db.model(ENVIRONMENT_VARIABLES.Database_Collection_4, folderSchema);
        const folder = new Folder({
            name:req.body.name,
            description:req.body.description,
            });
            folder.save((err, folder)=>{
        if(err){
            res.status(500).send(convertError(err.errors));
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(folder);
        }  
    });
    }catch(err){
        res.status(500).send(err.message);
    }
});

///Gets a Single folder
exports.getFolder = (async(req,res)=>{
    try{
    var db = await connect();
    var Folder = db.model(ENVIRONMENT_VARIABLES.Database_Collection_4, folderSchema);
    Folder.find({_id:ObjectId(req.params),}, {},  function(err, folder){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(folder);
        }
            });
    }catch(e){
        res.status(500).send(e.message);
    }
});
///Deletes a Single folder
exports.deleteFolder = (async(req,res)=>{
    try{
    var db = await connect();
    var Folder = db.model(ENVIRONMENT_VARIABLES.Database_Collection_4, folderSchema);
    Folder.findOneAndDelete({ _id: ObjectId(req.params.id )}, (err, yourFolder)=>{
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
///Updates a single folder
exports.updateFolder = (async(req,res)=>{
    try{
        var db = await connect();
    var Folder = db.model(ENVIRONMENT_VARIABLES.Database_Collection_4, folderSchema);
    Folder.findByIdAndUpdate({ _id: ObjectId(req.params)},
     {$set: {  name:req.body.name,
        description:req.body.description, }}, (err, yourFolderection)=>{
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

///Gets all folder
exports.getALL =(async(req,res)=>{
    try{
    var db = await connect();
    var Folder = db.model(ENVIRONMENT_VARIABLES.Database_Collection_4, folderSchema);
    Folder.find({}, (err,yourFolder)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(yourFolder);
        }
    })
    }catch(e){
        res.status(500).send(e.message);
     }
    
})