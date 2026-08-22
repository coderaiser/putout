import * as applyGenerateSeries from './apply-generate-series/index.js';
import * as convertLastInsertRowidToReturningId from './convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertAutoIncrementToIdentity from './convert-auto-increment-to-identity/index.js';

export const rules = {
    'apply-generate-series': applyGenerateSeries,
    'convert-last-insert-rowid-to-returning-id': convertLastInsertRowidToReturningId,
    'convert-auto-increment-to-identity': convertAutoIncrementToIdentity,
};
