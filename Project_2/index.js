const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: "../Project_2/.env" });
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}), bodyParser.json());

//  const card = {
//     "Question" : "",
//     "Answer": {},
//     "Hints/Notes":"",
//     "datetime":"datetimestamp"
//  }

// const study_collection = {
//     "Cards" : [card],
//     "Author": "user",
//     "datetime": ""
// }

// const user = {
//     "Username" : "email@username",
//     "Password" : "password",
//     "first_name" : "",
//     "last_name": "",
//     "datetime": ""
// }

// const folder = {
//     "Name": "folder_name",
//     "Collections": [],
//     "Description": " Folder description",
//     "School":"",
//     "Class_name": "",
//     "Teacher" : "",
//     "Semester": "",
//     "Year" : "",
//     "datetime": ""
// }


const routes = require('./Backend/routes/user');
app.use(routes);



// To handle any other route
app.all("/*", (req,res) => {
    res.send("404 Page not found.");
});

app.listen((PORT), () => {
    console.log("Server is running on port http://localhost:" + PORT )
});
