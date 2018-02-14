var express = require("express");

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function(request, response){
    response.send("Hello, Express.js");
});
app.get("/hello", function(request, response){
    response.send("Hello, stranger!");
});
app.get("/hello/:name", function(request, response){
    response.send("Hello, " + request.params["name"] + "!");
});
app.all("/sub/*", function(request, response){
    response.send("You requested URI: " + request.originalUrl);
});
app.post('/post', function(request, response, next) {
    if (!request.get("Key")) {
        return response.sendStatus(401);
    }
    next();
    }, function(request, response) {
        if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
            return response.sendStatus(404);
        }
        response.json(request.body);
});
app.listen(3000);