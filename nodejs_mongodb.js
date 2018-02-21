var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://127.0.0.1:27017/users', function (err, db) {
    const database = db.db("users");
    let user1 = {name: "Tom", age: 23, department: "Sales"};
    let user2 = {name: "John", age: 20, department: "IT"};
    let user3 = {name: "Dave", age: 27, department: "IT"};
    let user4 = {name: "Julia", age: 22, department: "Accounts"};
    let user5 = {name: "Mary", age: 33, department: "Sales"};
    database.collection("users").insertMany([user1, user2, user3, user4, user5],  function(err, result) {
        if (err) {
            return console.log(err);
        }
    });
    database.collection("users").find().toArray(function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(result);
    });
    database.collection("users").updateMany({department: "IT"}, {$set: {department: "IT+"}}, function (err, result) {
        if (err) {
            return console.log(err);
        }
    });
    database.collection("users").find().toArray(function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(result);
    });
    database.collection("users").removeMany({department: "IT+"}, function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(result);
    });
    db.close();
});