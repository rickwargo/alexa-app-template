/*jslint node: true */
/*global describe */
/*global it */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    request = require('./helpers/request'),
    Text = require('../lib/text');

chai.use(chaiAsPromised);
chai.should();

////////////// Base Tests //////////////

describe('App Starter Tests', function () {
    describe('starting up', function () {
        it('should fail if an unknown application id is provided', function () {
            var result = request.badAppId();
            return result.should.eventually.be.rejected;
        });

        it('should fail if a missing application is provided', function () {
            var result = request.badSessionApplication();
            return result.should.eventually.be.rejected;
        });

        it('should respond what to ask for', function () {
            var result = request.launchRequest();
            return result.should.eventually.equal('<speak>' + Text.onLaunchPrompt + '</speak>');
        });
    });

    describe('an unknown intent', function () {
        it('should respond with an error message', function () {
            var result = request.intentRequest({name: 'NOT-A-REAL-INTENT!', slots: {}});
            return result.should.eventually.equal('<speak>' + Text.failedResponse + '</speak>');
        });
    });

    describe('the help intent', function () {
        it('should respond with the help message', function () {
            var result = request.intentRequest({name: 'AMAZON.HelpIntent'});
            return result.should.eventually.equal('<speak>' + Text.help + '</speak>');
        });
    });

    describe('the cancel intent', function () {
        it('should respond with the goodbye message', function () {
            var result = request.intentRequest({name: 'AMAZON.CancelIntent'});
            return result.should.eventually.equal('<speak>' + Text.goodbye + '</speak>');
        });
    });

    describe('the stop intent', function () {
        it('should respond with the goodbye message', function () {
            var result = request.intentRequest({name: 'AMAZON.StopIntent'});
            return result.should.eventually.equal('<speak>' + Text.goodbye + '</speak>');
        });
    });

    describe('custom slot types', function () {
        var alexaApp = require('../index');
        it('should generate the correct representation when one slot type is provided', function () {
            alexaApp.customSlotType('SONG_DRINKS1', 'beer');

            var result = JSON.parse(alexaApp.customslottypes());
            return result.SONG_DRINKS1.should.deep.equal(
                ['beer']
            );
        });
        it('should generate the correct representation', function () {
            alexaApp.customSlotType('SONG_DRINKS3', ['bourbon', 'scotch', 'beer']);

            var result = JSON.parse(alexaApp.customslottypes());
            return result.SONG_DRINKS3.sort().should.deep.equal(
                ['beer', 'bourbon', 'scotch']
            );
        });
        it('should generate the correct representation even with duplicates', function () {
            alexaApp.customSlotType('SONG_DRINKS6', ['bourbon', 'scotch', 'beer']);
            alexaApp.customSlotType('SONG_DRINKS6', ['bourbon', 'scotch', 'beer']);

            var result = JSON.parse(alexaApp.customslottypes());
            return result.SONG_DRINKS3.sort().should.deep.equal(
                ['beer', 'bourbon', 'scotch']
            );
        });
    });
});
