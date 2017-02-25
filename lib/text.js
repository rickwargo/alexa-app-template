/*jslint node: true */
'use strict';

var textHelper = {
    failedResponse: 'I\'m sorry. There was a problem processing this request. The Alexa card may have more details. Goodbye.',
    onLaunchPrompt: 'Welcome to the Alexa App Template. You can ask for the story however, you will want to change this message.',
    help: 'You can ask for the story however you will want to change this message.',
    helpAfterPause: 'What story do you want to hear?',
    goodbye: 'Thank you for interacting with me. Goodbye.',

    /**
     * Recursively attempt to build an Alexa "sayable" string that represents the supplied exception object.
     * @param exc
     * @returns {string}
     */
    exceptionMsg: function (exc) {
        var thisForScopeIssueInJSLint = this;
        return exc.message || (Array.isArray(exc)
            ? exc.map(function (e) {
                return thisForScopeIssueInJSLint.exceptionMsg(e);
            }).join("\n")
            : exc);
    }
};

module.change_code = 1;
module.exports = textHelper;
