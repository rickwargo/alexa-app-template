////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015-2016 Rick Wargo. All Rights Reserved.
//
// Licensed under the MIT License (the "License"). You may not use this file
// except in compliance with the License. A copy of the License is located at
// http://opensource.org/licenses/MIT or in the "LICENSE" file accompanying
// this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
// OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
////////////////////////////////////////////////////////////////////////////////

/*global describe, it, beforeEach */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

////////////// Tests Configuration Files //////////////

describe('AWS Config', function () {
    describe('Property', function () {
        var config;
        beforeEach(function () {
            config = require('../config/aws-config');
        });
        it('runtime is nodejs4.3', function () {
            var result = config.runtime;
            return result.should.equal('nodejs4.3');
        });
        it('region is us-east-1', function () {
            var result = config.region;
            return result.should.equal('us-east-1');
        });
    });
});

describe('App Config', function () {
    describe('Property', function () {
        var config;
        beforeEach(function () {
            config = require('../config/app-config');
        });
        it('applicationName is alexa-app-template', function () {
            var result = config.applicationName;
            return result.should.equal('alexa-app-template');
        });
        it('applicationId is set to correct Id', function () {
            var result = config.applicationId;
            return result.should.equal(config.applicationId);
        });
    });
});