/*jslint node: true */
'use strict';

// Update the AWS Region once in the beginning
var AppConfig = require('../config/app-config');

var Alexa = require('alexa-app'),
    Text = require('./text');

// Define an alexa-app
var alexaApp = new Alexa.app(AppConfig.applicationName);


alexaApp.slotTypes = {};

/**
 * Generate the Custom Slot Types for the Interaction Model
 * @param slotType
 * @param values
 */
alexaApp.customSlotType = function (slotType, values) {
    var self = this;

    if (slotType && self.slotTypes[slotType] && !values) {
        // Remove the slot type if null is specified for value(s)
        delete self.slotTypes[slotType];
        return;
    }

    if (!Array.isArray(values)) {
        values = [values];
    }

    if (!self.slotTypes[slotType]) {
        self.slotTypes[slotType] = new Set();  // don't allow duplicates
    }

    values.forEach(function (value) {
        self.slotTypes[slotType].add(value);
    });

};

/**
 * Build a string containing the JSON representing the custom slot types
 * @returns {string}
 */
alexaApp.customslottypes = function () {
    var slotTypes = this.slotTypes,
        out = '',
        doSlot = function (value) {
            out += ' "' + value.replace(/"/g, '\\\\"') + '",';
        };

    Object.keys(slotTypes).forEach(function (slotType) {
        if (out === '') {
            out = '{';
        } else {
            out += ',';
        }
        out += '\n          "' + slotType + '": [';
        slotTypes[slotType].forEach(doSlot);
        out = out.slice(0, -1) + ' ]';  // remove last comma
    });

    return out
        ? out + "\n        }"
        : '{}';
};

/**
 * Configure the launch event with a message to say the welcome message
 * @param ignore request
 * @param response
 */
alexaApp.launch(function (ignore, response) {
    response
        .say(Text.onLaunchPrompt)
        .shouldEndSession(false, Text.helpAfterPause);
});

/**
 * Ensure it is our intended application sending the requests
 * @param request
 * @param response
 * @param ignore type
 */
alexaApp.pre = function (request, response, ignore) {
    if (!request.sessionDetails.application) {
        response.fail('Skill is not initialized correctly.');  // potentially refresh the page if testing in the UI
    } else if (request.sessionDetails.application.applicationId !== AppConfig.applicationId) {
        // Fail ungracefully
        response.fail('Invalid applicationId: ' + request.sessionDetails.application.applicationId);
    }
};

/**
 * Any exceptions can be handled by a generic error handler which you can define for your app
 * @param exception
 * @param request
 * @param response
 */
alexaApp.error = function (exception, request, response) {
    console.error(exception);
    var msg = Text.exceptionMsg(exception);
    response
        .say(Text.failedResponse)
        .card('Problem Processing Request - ' + request.data.request.intent.name, msg);
};

/**
 * Following are the default intents
 */

alexaApp.intent('AMAZON.CancelIntent', function (ignore, response) {
    response
        .say(Text.goodbye)          // Or cancel a transaction or task (but remain in the skill)
        .shouldEndSession(true);
});

alexaApp.intent('AMAZON.StopIntent', function (ignore, response) {
    response
        .say(Text.goodbye)          // Or cancel a transaction or task (but remain in the skill)
        .shouldEndSession(true);
});

alexaApp.intent('AMAZON.HelpIntent', function (ignore, response) {
    response
        .say(Text.help)
        .shouldEndSession(false, Text.helpAfterPause);
});

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = alexaApp;
