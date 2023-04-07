'use strict';

module.exports.report = () => 'Shorten require path to putout exports';

module.exports.replace = () => ({
    'require("putout/lib/cli/process-file")': 'require("putout/process-file")',
    'require("putout/lib/parse-options")': 'require("putout/parse-options")',
});
