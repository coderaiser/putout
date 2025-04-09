import * as resolveImportedFile from './resolve-imported-file/index.js';
import * as addIndexToImport from './add-index-to-import/index.js';
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
    'add-index-to-import': ['off', addIndexToImport],
    'apply-export-from': applyExportFrom,
    'convert-assert-to-with': convertAssertToWith,
    'declare-imports-first': declareImportsFirst,
    'group-imports-by-source': groupImportsBySource,
    ...mergeDuplicateImports.rules,
    'remove-quotes-from-import-assertions': removeQuotesFromImportAssertions,
    'remove-empty-import': removeEmptyImport,
    'remove-empty-export': removeEmptyExport,
    'sort-imports-by-specifiers': sortImportsBySpecifiers,
    'resolve-imported-file': ['off', resolveImportedFile],
};
