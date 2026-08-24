import * as convertLastInsertRowidToReturningId from './convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertAutoIncrementToIdentity from './convert-auto-increment-to-identity/index.js';
import * as convertGenerateSeriesToWithRecursive from './convert-generate-series-to-with-recursive/index.js';

export const rules = {
    'convert-last-insert-rowid-to-returning-id': convertLastInsertRowidToReturningId,
    'convert-auto-increment-to-identity': convertAutoIncrementToIdentity,
    'convert-generate-series-to-with-recursive': convertGenerateSeriesToWithRecursive,
};
