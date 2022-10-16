const express = require("express");
const cardsRouter = express.Router();
var newDate = new Date();
var datetime =  newDate.toLocaleString();
const { removeAllListeners } = require("nodemon");
const cardController =require("../controllers/card");



cardsRouter.route("/create").post(cardController.create);

cardsRouter.route("/:id").get(cardController.findCard).put(cardController.updatebyID).delete(cardController.deleteById);;

module.exports = cardsRouter;