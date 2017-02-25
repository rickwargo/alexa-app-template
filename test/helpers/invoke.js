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

var invoke = !process.env.SERVER
    ? require('./invokeMock')
    : (process.env.SERVER.toLowerCase() === 'lambda'
        ? require('./invokeLambda')
        : (process.env.SERVER.toLowerCase() === 'local'
            ? require('./invokeLocal')
            : require('./invokeMock')));

module.exports = function (payload) {
    return invoke(payload)
        .then(function (data) {
            if (data.response && data.response.outputSpeech) {
                return data.response.outputSpeech.ssml;
            }
            if (data.errorMessage) {
                throw data.errorMessage;
            }
            throw 'unknown response: ' + JSON.stringify(data, null, 2);
        });
};