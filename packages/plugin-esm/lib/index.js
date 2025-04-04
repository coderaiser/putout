import * as declareImportsFirst from './declare-imports-first/index.js';
import * as groupImportsBySource from './group-imports-by-source/index.js';
import * as removeQuotesFromImportAssertions from './remove-quotes-from-import-assertions/index.js';
import * as sortImportsBySpecifiers from './sort-imports-by-specifiers/index.js';
import * as removeEmptyImport from './remove-empty-import/index.js';
import * as removeEmptyExport from './remove-empty-export/index.js';
import * as mergeDuplicateImports from './merge-duplicate-imports/index.js';
import * as convertAssertToWith from './convert-assert-to-with/index.js';
import * as applyExportFrom from './apply-export-from/index.js';

export const rules = {
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
