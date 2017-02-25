/*jslint node: true */
'use strict';

var app = require('./lib/app-starter');
    //Text = require('./lib/text');

// Add your intent items to the dictionary to be expanded when creating utterances
Object.assign(app.dictionary, {
    whats: ['what is', 'what\'s', 'about', 'give me', 'tell me'],
    the: ['the', 'a', 'an']
});

// Change the customSlotTypes, or delete if none.
app.customSlotType('STORY_TYPE', ['whole', 'complete', 'partial', 'short']);

// A very basic intent outline with a single slot - change to fit your intent
// Remember to add at least one test for each intent!
app.intent('StoryIntent', {
    slots: {
        StoryType: 'STORY_TYPE'
    },
    utterances: [
        '{whats|} {the} {-|StoryType} story'
    ]
}, function (request, response) {
    var storyType = request.slot('StoryType') || 'whole';

    var msg = 'The ' + storyType + ' story is the yours for the asking.';
    response.say(msg);
});


// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = app;
