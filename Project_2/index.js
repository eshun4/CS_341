const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: "../Project_2/.env" });
const ENVIRONMENT_VARIABLES = require("./Backend/encryption/dotenv");
const PORT = ENVIRONMENT_VARIABLES.Database_PORT;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}), bodyParser.json());
const server = require('http').createServer(app);
const WebSocket = require('ws');
const routes = require('./Backend/routes/user');
app.use(routes);
exports.wss = wss = new WebSocket.Server({server:server});

wss.on('connection', function connection(ws) {
    console.log("Connected!");
    ws.on('message', function message(data) {
      wss.clients.forEach(function each(client) {
        console.log("Received: " + data);
        client.send("Message Received!")
      });
    });
  });

// To handle any other route
app.all("/*", (req,res) => {
    res.send("404 Page not found.");
});




server.listen((PORT), () => {
    console.log("Server is running on port http://localhost:" + PORT )
});

exports.module = wss;