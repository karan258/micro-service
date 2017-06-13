/**
 * Model :: Files Model
 * Author :: Karan Thakkar
 */
'use strict';
var mongoose = require('mongoose');

var filesSchema = mongoose.Schema({
    tenantId: String,
    userid: String,
    customerId: String,
    portalId: String,
    status: String,
    sysState: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now},
    whoCreated: String,
    whoUpdated: String,
    firstName: String,
    lastName: String,
    fullname: String,
    phoneMobile: String,
    referral: String,
    email: String,
    IsProcessed: Boolean,
    modelId: String,
    masks: Boolean,
    keywords: String,
    ownerID: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'People'
        }]
});

var Files = mongoose.model("Files", filesSchema);

module.exports = Files;
