/*jslint node: true */
'use strict';

module.exports = {
    region: 'us-east-1',
    profile: 'default',
    role: 'arn:aws:iam::000000000000:role/alexa-app-template-skill',
    handler: 'index.handler',
    timeout: 3,
    memorySize: 128,
    runtime: 'nodejs4.3'
};

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
