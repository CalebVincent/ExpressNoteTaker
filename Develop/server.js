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
app.get("/api/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "notes.html"))
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
  