const express = require("express");
const folderRouter = express.Router();
const folderController =require("../controllers/folder");

folderRouter.get("/all", folderController.getALL);
folderRouter.route('/create').post( folderController.createFolder);
folderRouter.route('/:id').get(folderController.getFolder).delete(folderController.deleteFolder).put(folderController.updateFolder);


module.exports = folderRouter;