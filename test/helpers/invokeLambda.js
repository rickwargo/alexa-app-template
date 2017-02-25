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

'use strict';

var AWS = require('aws-sdk'),
    AWSConfig = require('../../config/aws-config'),
    AppConfig = require('../../config/app-config'),
    promise = require('bluebird');

AWS.config.update({
    region: AWSConfig.region,
    credentials: new AWS.SharedIniFileCredentials({profile: AWSConfig.profile})
});

var lambda = new AWS.Lambda();
promise.promisifyAll(Object.getPrototypeOf(lambda), {suffix: '_Async'});

module.exports = function (payload) {
    var params = {
        FunctionName: AppConfig.functionName, /* required */
        //ClientContext: 'STRING_VALUE',
        //InvocationType: 'Event | RequestResponse | DryRun',
        //LogType: 'None | Tail',
        Payload: JSON.stringify(payload, null, 2)
        //Qualifier: 'STRING_VALUE'
    };

    return lambda.invoke_Async(params)
        .then(function (data) {
            return (JSON.parse(data.Payload));
        });
};