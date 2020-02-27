// dependencies
var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var fs = require("fs");

// setup express app
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

app.get("/api/notes", function (req,res) {
    return res.json(db);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
  