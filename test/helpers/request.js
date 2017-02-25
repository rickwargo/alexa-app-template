/*jslint node: true */
'use strict';

var AlexaSkillInvoke = require('./invoke'),
    AppConfig = require('../../config/app-config'),
    JSONtemplate = require('../fixtures/request.json'),
    RandomUserId = require('./randomuserid')(),
    uuid = require('uuid').v4,
    requestHelper = {};

function setApplicationId(json, applicationId) {
    if (applicationId) {
        json.session.application.applicationId = applicationId;
        json.context.System.application.applicationId = applicationId;
    } else {
        delete json.session.application;
        delete json.context.System.application;
    }
}

function setUserId(json, userId) {
    if (userId) {
        json.session.user.userId = userId;
        json.context.System.user.userId = userId;
    } else {
        delete json.session.user;
        delete json.context.System.user;
    }
}

function requestJSON(intent) {
    var json = JSON.parse(JSON.stringify(JSONtemplate));

    setApplicationId(json, AppConfig.applicationId);
    setUserId(json, 'amzn1.ask.account.' + RandomUserId);   // May need logic to control when this changes
    json.session.sessionId = 'sessionId.' + uuid();         // May need logic to control when this changes
    json.request.requestId = 'amzn1.echo-api.request.' + uuid();
    json.request.timestamp = new Date().toISOString();
    if (intent) {
        json.request.intent = intent;
    }

    return json;
}

function launchJSON() {
    var json = requestJSON();

    json.request.type = 'LaunchRequest';
    json.session.new = true;
    return json;
}

// Generic unit test to see if it handles a bad application Id
requestHelper.badAppId = function () {
    var payload = launchJSON();

    setApplicationId(payload, 'amzn1.echo-sdk-ams.app.000000-0000-0000-0000-000000000000');
    return new AlexaSkillInvoke(payload);
};

// Generic unit test to see if it handles a bad session.application
requestHelper.badSessionApplication = function () {
    var payload = launchJSON();

    delete payload.session.application;
    return new AlexaSkillInvoke(payload);
};

// Generic unit test to see if it handles capturing the text from starting up
requestHelper.launchRequest = function () {
    var payload = launchJSON();

    return new AlexaSkillInvoke(payload);
};

requestHelper.intentRequest = function (intent, supplement) {
    var payload = requestJSON(intent);

    if (supplement) {
        supplement(payload);
    }

    return new AlexaSkillInvoke(payload);
};

requestHelper.intentResponse = function (intent, sessionAttributes) {
    var payload = requestJSON(intent);

    if (sessionAttributes) {
        payload.session.attributes = sessionAttributes;
    }

    return new AlexaSkillInvoke(payload, true);
};

module.exports = requestHelper;