const express = require("express");
const router = express.Router();
const contactRouter = require('../routes/contacts');

router.use('/', require('./swagger'));
router.use('/contacts', contactRouter);
  
// To handle any other route
router.all("/*", (req,res) => {
    res.send("Welcome to the HomePage.");
});

//Once you make the export below you can use al the routes from here in your main.js file
module.exports = router;