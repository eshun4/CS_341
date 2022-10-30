const express = require("express");
const cardsRouter = express.Router();
const cardController =require("../controllers/card");



cardsRouter.route("/all").get(cardController.getALL);
cardsRouter.route("/create").post(cardController.create);

cardsRouter.route("/:id").get(cardController.findCard).put(cardController.updatebyID).delete(cardController.deleteById);

module.exports = cardsRouter;