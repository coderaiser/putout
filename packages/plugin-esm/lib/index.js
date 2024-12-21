'use strict';

const declareImportsFirst = require('./declare-imports-first');
const groupImportsBySource = require('./group-imports-by-source');
const mergeDuplicateImportsJoin = require('./merge-duplicate-imports-join');
const mergeDuplicateImportsRename = require('./merge-duplicate-imports-rename');
const removeQuotesFromImportAssertions = require('./remove-quotes-from-import-assertions');
const sortImportsBySpecifiers = require('./sort-imports-by-specifiers');
const removeEmptyImport = require('./remove-empty-import');
const removeEmptyExport = require('./remove-empty-export');

module.exports.rules = {
    'declare-imports-first': declareImportsFirst,
    'group-imports-by-source': groupImportsBySource,
    'merge-duplicate-imports-join': mergeDuplicateImportsJoin,
    'merge-duplicate-imports-rename': mergeDuplicateImportsRename,
    'remove-quotes-from-import-assertions': removeQuotesFromImportAssertions,
    'remove-empty-import': removeEmptyImport,
    'remove-empty-export': removeEmptyExport,
    'sort-imports-by-specifiers': sortImportsBySpecifiers,
};
