/*jslint node: true */
'use strict';

var appConfig = {
    applicationId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000', // Don't update here, update package.json
    applicationName: 'alexa-app-template',           // Must update this - no spaces, should be a valid identifier (hypens ok)
    functionName: 'alexa-app-template-skill',        // Must update or gulp test-lambda will fail
    description: 'A starter template to build your Alexa skill'
};

// Allow applicationId to be held in separate file
var appId = require('../package.json');
appConfig.applicationId = appId.alexa.applicationId;


// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = appConfig;