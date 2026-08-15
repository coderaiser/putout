import * as convertAutoIncrementToIdentity from './convert-sqlite-to-postgresql/convert-auto-increment-to-identity/index.js';
import * as convertLastInsertRowidToReturningId from './convert-sqlite-to-postgresql/convert-last-insert-rowid-to-returnning-id/index.js';
import * as applyCount from './apply-count/index.js';

export const rules = {
    'apply-count': applyCount,
    'convert-sqlite-to-postgresql/convert-last-insert-rowid-to-returning-id': ['off', convertLastInsertRowidToReturningId],
    'convert-sqlite-to-postgresql/convert-auto-increment-to-identitiy': ['off', convertAutoIncrementToIdentity],
};
