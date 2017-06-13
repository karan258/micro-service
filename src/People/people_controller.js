/**
 * Controller :: People Controller
 * Author :: Karan Thakkar
 */
'use strict';
var flatten = require('flat');

var People = require('./people_model');
var Files = require('../Files/files_model');

var addPeople = function (req, res) {
    var peopleInfo = req.body;
    console.log(peopleInfo);
    if (!peopleInfo.firstName) {
        res.end("First Name is Required");
    } else if (!peopleInfo.lastName) {
        res.end("Last Name is Required");
    } else {
        var newPeople = new People({
            firstName: peopleInfo.firstName,
            lastName: peopleInfo.lastName,
            fullname: peopleInfo.firstName + " " + peopleInfo.lastName,
            email: peopleInfo.email,
            phoneMobile: peopleInfo.phoneMobile,
        })
        newPeople.save(function (err, resp) {
            if (err) {
                res.end('Error creating record');
            } else {
                res.end("Record added successfully!");
            }
        });
    }
}

var listPeople = function (req, res) {
    People.find({}, function (err, peopleInfo) {
        if (err) {
            res.end('Error Retrieving from Database');
        } else {
            res.json(peopleInfo);
        }
    });
}

var getPeople = function (req, res) {
    People.findOne({_id: req.params.id}, function (err, peopleInfo) {
        if (err) {
            res.end('Error Retrieving from Database');
        } else {
            res.json(peopleInfo);
        }
    });
}

var updatePeople = function (req, res) {
    function callback(err, numAffected) {
        if (err) {
            res.end('Error Updating!');
        } else {
            res.end(JSON.stringify(numAffected));
        }
    }

    var peopleInfo = req.body;
    var condition = {_id: req.body._id};
    var options = {multi: true};
    
    People.update(condition, peopleInfo, options, callback);
}

var deletePeople = function (req, res) {
    People.remove({_id: req.body._id}, function (err, numAffected) {
        if (err) {
            res.end('Error deleting record');
        } else if (JSON.parse(numAffected).n != 0) {
            res.end("Rows Deleted: " + JSON.stringify(numAffected));
        } else {
            res.end("No Matching Entry Found");
        }
    });
}

module.exports = {
    'add': addPeople,
    'list': listPeople,
    'get': getPeople,
    'update': updatePeople,
    'delete': deletePeople,
};
