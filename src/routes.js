/**
 * Common routes file
 * Author :: Karan Thakkar
 */
'use strict';

var express = require('express');
var router = express.Router();

router.use('/people', require('./People/index.js'));
router.use('/files', require('./Files/index.js'));

module.exports = router;
