// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require('./helpers/uuid');

// set up express and data parsing
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ~~~~~~~~~ routes ~~~~~~~~~
// home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// notes api page
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})


// ~~~~~~~~~ post routes ~~~~~~~~~




//starts the server
app.listen(PORT, function () {
    console.log("Listening on PORT ", PORT)
});