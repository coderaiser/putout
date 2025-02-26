'use strict';

const declareImportsFirst = require('./declare-imports-first');
const groupImportsBySource = require('./group-imports-by-source');
const removeQuotesFromImportAssertions = require('./remove-quotes-from-import-assertions');
const sortImportsBySpecifiers = require('./sort-imports-by-specifiers');
const removeEmptyImport = require('./remove-empty-import');
const removeEmptyExport = require('./remove-empty-export');
const mergeDuplicateImports = require('./merge-duplicate-imports');
const convertAssertToWith = require('./convert-assert-to-with');
const applyExportFrom = require('./apply-export-from');

module.exports.rules = {
    ...mergeDuplicateImports.rules,
    'declare-imports-first': declareImportsFirst,
    'group-imports-by-source': groupImportsBySource,
    'remove-quotes-from-import-assertions': removeQuotesFromImportAssertions,
    'remove-empty-import': removeEmptyImport,
    'remove-empty-export': removeEmptyExport,
    'sort-imports-by-specifiers': sortImportsBySpecifiers,
    'convert-assert-to-with': convertAssertToWith,
    'apply-export-from': applyExportFrom,
};
