/*jslint node: true */
'use strict';

var requestPromise = require('request-promise'),
    AppConfig = require('../../config/app-config');

require('../../../../server');  // requiring load the web server for testing

module.exports = function (payload) {
    return requestPromise({
        method: 'POST',
        uri: 'http://localhost:8003/alexa/' + AppConfig.applicationName,
        json: payload
    });
};