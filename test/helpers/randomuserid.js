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

/**
 * Returns a random User ID (48-character sequence of uppercase letters and numbers)
 * @returns {string}
 */
function randomUserId() {
    function randSeq() {
        return Math.random()
            .toString(36)
            .substring(2)
            .toUpperCase();
    }
    var seq = randSeq() + randSeq();
    return seq.substring(0, 48);
}

module.exports = randomUserId;