var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://127.0.0.1:27017/contacts";

app.use(express.static(__dirname + "/html"));

app.get("/api/contacts", function(req, res){
    mongoClient.connect(url, function(err, db){
        const database = db.db("contacts");
        database.collection("contacts").find().toArray(function(err, contacts){
            res.send(contacts);
            db.close();
        });
    });
});

//localhost:3000/api/contacts/find?field={fieldname}&value={value}
app.get("/api/contacts/find", function(req, res){
    var field = req.query.field;
    var value = req.query.value;
    var query = {};
    query[field] = value;
    console.log(req.query.field + ':' + req.query.value);
    mongoClient.connect(url, function(err, db){
        const database = db.db("contacts");
        database.collection("contacts").findOne(query, function(err, contact){
            if(err) return res.status(400).send();
            res.send(contact);
            db.close();
        });
    });
});

app.get("/api/contacts/:id", function(req, res){
    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db){
        const database = db.db("contacts");
        database.collection("contacts").findOne({_id: id}, function(err, contact){
            if (err) return res.status(400).send();
            res.send(contact);
            db.close();
        });
    });
});

app.post("/api/contacts", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var contactLastName = req.body.lastname;
    var contactFirstName = req.body.firstname;
    var contactPhoneNumber = req.body.phonenumber;
    var contact = {lastname: contactLastName, firstname: contactFirstName, phonenumber: contactPhoneNumber};
    mongoClient.connect(url, function(err, db){
        const database = db.db("contacts");
        database.collection("contacts").insertOne(contact, function(err, result){
            if (err) return res.status(400).send();
            res.send(contact);
            db.close();
        });
    });
});

app.delete("/api/contacts/:id", function(req, res){
    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db){
        const database = db.db("contacts");
        database.collection("contacts").findOneAndDelete({_id: id}, function(err, result){
            if (err) return res.status(400).send();
            var contact = result.value;
            res.send(contact);
            db.close();
        });
    });
});

app.put("/api/contacts", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var contactLastName = req.body.lastname;
    var contactFirstName = req.body.firstname;
    var contactPhoneNumber = req.body.phonenumber;
    mongoClient.connect(url, function(err, db){
        const database = db.db("contacts");
        database.collection("contacts").findOneAndUpdate({_id: id}, { $set: {lastname: contactLastName, firstname: contactFirstName, phonenumber:contactPhoneNumber}},
            {returnOriginal: false },function(err, result){
                if (err) return res.status(400).send();
                var contact = result.value;
                res.send(contact);
                db.close();
            });
    });
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});