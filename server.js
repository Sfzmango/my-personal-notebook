// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// add __dirname to make sure that we are grabbing from the right directory
const uuid = require(__dirname + '/helpers/uuid');
let notes = require(__dirname + "/db/db.json");

// set up express and data parsing
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// ~~~~~~~~~ routes ~~~~~~~~~
// home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// notes api page
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// redirect 404
//app.get()


// ~~~~~~~~"__dirname + ~, post routes ~~~~~~~~~
app.post("/api/notes", function (req, res) {
    // logging that the post request was received
    console.log(`${req.method} request was made. Adding note.`);

    // deconstructs data
    const { title, text } = req.body;

    // checks if text boxes are truthy
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid() //adds a unique id to each note
        };

        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) {
                console.error(err);
            }
            else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote)
                notes = parsedNotes;

                fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4), function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log("Sucessfully added a new note");
                    };
                });
            };
        });

        const successMsg = {
            status: "Sucessfully added a new note",
            noteInfo: newNote,
        };

        console.log(successMsg);
        res.json(successMsg);
    }
    else {
        res.json('Error in posting review');
    }
});



//starts the server
app.listen(PORT, function () {
    console.log("Listening on PORT ", PORT);
});