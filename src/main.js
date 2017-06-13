/**
 * Main/Server file of the application
 * Author :: Karan Thakkar
 */
'use strict';
var express = require('express');
var mongoose = require('mongoose');
var myParser = require("body-parser");
var config = require('./config');
var router = require('./routes');

var app = express();
app.use(myParser.json());
app.use(myParser.urlencoded({extended: true}));
app.use(myParser.raw({type: "application/json"}));
app.use(router);

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to:", config.database);
});

app.listen(config.port, function () {
    console.log("Node server started over port", config.port);
});
