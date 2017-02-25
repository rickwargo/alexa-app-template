/*jslint node: true */
'use strict';

module.exports = {
    applicationId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',   // Must update or all calls will fail on appIntent.pre()
    applicationName: 'alexa-app-template',           // Must update this - no spaces, should be a valid identifier (hypens ok)
    functionName: 'alexa-app-template-skill',        // Must update or gulp test-lambda will fail
    description: 'A starter template to build your Alexa skill'
};

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
