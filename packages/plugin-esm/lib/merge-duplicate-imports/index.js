'use strict';

const mergeDuplicateImportsJoin = require('./join');
const mergeDuplicateImportsRename = require('./rename');

module.exports.rules = {
    'merge-duplicate-imports-join': mergeDuplicateImportsJoin,
    'merge-duplicate-imports-rename': mergeDuplicateImportsRename,
};
