const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
PORT = process.env.PORT;
const bodyParser = require("body-parser");



app.use(bodyParser.json());

const routes = require('./routes/');
app.use(routes);



app.listen(PORT, () =>{
    console.log("Server is running at http://localhost:" + PORT);
})