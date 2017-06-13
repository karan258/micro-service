/**
 * Routes for People Module
 * Author :: Karan Thakkar
 */
'use strict';
var express = require('express');
var router = express.Router();
var people = require('./people_controller');

router.post('/add', function (req, res) {
    people.add(req, res);
});

router.get('/list', function (req, res) {
    people.list(req, res);
});

router.put('/update', function (req, res) {
    people.update(req, res);
});

router.delete('/delete', function (req, res) {
    people.delete(req, res);
});

router.get('/get/:id', function (req, res) {
    people.get(req, res);
});

module.exports = router;
