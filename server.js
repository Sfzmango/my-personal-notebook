// dependencies
const express = require("express");
const path = require("path");

// set up express and data parsing
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

//starts the server
app.listen(PORT, function () {
    console.log("Listening on PORT ", PORT)
});