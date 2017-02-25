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

/*property _read, exports, Readable, objectMode, push, File, cwd, base, path, contents */
'use strict';

var gutil = require('gulp-util');

function stringAsSrc(filename, string) {
    var src = require('stream').Readable({objectMode: true});
    src._read = function () {
        this.push(new gutil.File({cwd: '', base: '', path: filename, contents: new Buffer(string)}));
        this.push(null);
    };
    return src;
}

module.exports = stringAsSrc;