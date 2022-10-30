const express = require("express");
const collectionRouter = express.Router();
const collectionController =require("../controllers/collection");

collectionRouter.get("/all", collectionController.getALL);
collectionRouter.route('/create').post( collectionController.createCollection);
collectionRouter.route('/:id').get(collectionController.getCollection).delete(collectionController.deleteCollection).put(collectionController.updateCollection);


module.exports = collectionRouter;