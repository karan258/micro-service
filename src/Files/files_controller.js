/**
 * Controller :: Files Controller
 * Author :: Karan Thakkar
 */
'use strict';
var People = require('../People/people_model');
var Files = require('./files_model');

var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('fileName');

// Function to add new file
var addFile = function (req, res) {
    var fileInfo = req.body;
    var newFile = new Files({
        ownerID: fileInfo.userid,
        keywords: fileInfo.keywords,
    });

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        } else {
            newFile.path = req.file.path;
            newFile.save(function (err, resp) {
                if (err) {
                    res.end('Error creating record!');
                } else {
                    res.end("File uploaded successfully");
                }
            });
        }
    });
}

// Function to list all files
var listFiles = function (req, res) {
    Files.find({}, function (err, fileInfo) {
        if (err) {
            res.end('Error Retrieving from Database');
        } else {
            res.json(fileInfo);
        }
    });
}

// Function to get file by id
var getFile = function (req, res) {
    Files.find({_id: req.params.id}, function (err, fileInfo) {
        if (err) {
            res.end('Error Retrieving from Database');
        } else {
            res.json(fileInfo);
        }
    });
}

// Function to update file by id
var updateFile = function (req, res) {
    function callback(err, numAffected) {
        if (err) {
            res.end('Error Updating!');
        } else {
            res.end(JSON.stringify(numAffected));
        }
    }

    var fileInfo = req.body;
    var condition = {_id: req.body._id};
    var options = {multi: true};

    Files.update(condition, fileInfo, options, callback);
}

// Function to delete file by id
var deleteFile = function (req, res) {
    Files.remove({_id: req.body._id}, function (err, numAffected) {
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
    'add': addFile,
    'list': listFiles,
    'get': getFile,
    'update': updateFile,
    'delete': deleteFile,
};
