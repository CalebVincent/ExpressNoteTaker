// dependencies
var express = require("express");
var path = require("path");
var db = require("./Develop/db/db.json");
var fs = require("fs");

// setup express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("Develop/public"));

// setup html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
  });

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
  });

app.get("/api/notes", function (req,res) {
    return res.json(db);
});

// setup post routes for new notes and deleting notes
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    db.push(newNote);
  
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(db), function (err) {
      if (err) {
        return console.log(err);
      };
    });
    res.json(newNote);
  });
  
  app.delete("/api/notes/:id", function (req,res) {
    for (i=0; i < db.length; i++) {
      if (db[i].id == req.params.id) {
        db.splice(i,1);
      }
    };
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(req.params.id), "UTF8", (error) =>{
      if (error) throw error;
    })
  });
  

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
  