var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var QUOTES_COLLECTION = "quotes";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// QUOTES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/quotes"
 *    GET: finds all quotes
 *    POST: creates a new quote
 */

app.get("/api/quotes", function(req, res) {
  db.collection(QUOTES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get quotes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/quotes", function(req, res) {
  var newQuote = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(QUOTES_COLLECTION).insertOne(newQuote, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new quote.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/quotes/:id"
 *    GET: find quote by id
 *    PUT: update quote by id
 *    DELETE: deletes quote by id
 */

app.get("/api/quotes/:id", function(req, res) {
});

app.put("/api/quotes/:id", function(req, res) {
});

app.delete("/api/quotes/:id", function(req, res) {
});