/**
 * Routes for Files Module
 * Author :: Karan Thakkar
 */
'use strict';
var express = require('express');
var router = express.Router();
var files = require('./files_controller');

router.post('/add', function (req, res) {
    files.add(req, res);
});

router.get('/list', function (req, res) {
    files.list(req, res);
});

router.put('/update', function (req, res) {
    files.update(req, res);
});

router.delete('/delete', function (req, res) {
    files.delete(req, res);
});

router.get('/get/:id', function (req, res) {
    files.get(req, res);
});

module.exports = router;
