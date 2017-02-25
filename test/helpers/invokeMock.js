/*jslint node: true */
'use strict';

var alexaApp = require('../../index');

module.exports = function (payload) {
    return alexaApp.request(payload);
};