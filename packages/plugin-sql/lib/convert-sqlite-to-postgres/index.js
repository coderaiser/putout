import * as applyKeyExists from './apply-key-exists/index.js';
import * as applyJsonbExtractPathText from './apply-jsonb-extract-path-text/index.js';
import * as convertLastInsertRowidToReturningId from './convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertAutoIncrementToIdentity from './convert-auto-increment-to-identity/index.js';
import * as convertGenerateSeriesToWithRecursive from './convert-generate-series-to-with-recursive/index.js';

export const rules = {
    'apply-jsonb-extract-path-text': applyJsonbExtractPathText,
    'apply-key-exists': applyKeyExists,
    'convert-last-insert-rowid-to-returning-id': convertLastInsertRowidToReturningId,
    'convert-auto-increment-to-identity': convertAutoIncrementToIdentity,
    'convert-generate-series-to-with-recursive': convertGenerateSeriesToWithRecursive,
};
