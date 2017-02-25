/*jslint node: true */
/*global describe, it, context, beforeEach, afterEach */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    request = require('./helpers/request');
    // Text = require('../lib/text');

chai.use(chaiAsPromised);
chai.should();

var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

////////////// Tests Intents //////////////

describe('My Intents', function () {
    describe('the story intent', function () {
        it('tells you the whole story', function () {
            var result = request.intentRequest({name: 'StoryIntent'});
            return result.should.eventually.equal('<speak>The whole story is the yours for the asking.</speak>');
        });
        it('tells a partial story when asked', function () {
            var result = request.intentRequest({
                name: 'StoryIntent',
                slots: {
                    StoryType: {
                        name: 'StoryType',
                        value: 'partial'
                    }
                }
            });
            return result.should.eventually.equal('<speak>The partial story is the yours for the asking.</speak>');
        });
    });
});

