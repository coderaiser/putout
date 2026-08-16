import * as convertSequenceToSerial from './postgres/convert-sequance-to-serial/index.js';
import * as convertAutoIncrementToIdentity from './convert-sqlite-to-postgres/convert-auto-increment-to-identity/index.js';
import * as convertLastInsertRowidToReturningId from './convert-sqlite-to-postgres/convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertWithToSequential from './convert-postgres-to-sqlite/convert-with-to-sequential/index.js';
import * as applyCount from './apply-count/index.js';

export const rules = {
    'apply-count': applyCount,
    'postgres/convert-sequance-to-serial': convertSequenceToSerial,
    'convert-sqlite-to-postgres/convert-last-insert-rowid-to-returning-id': ['off', convertLastInsertRowidToReturningId],
    'convert-sqlite-to-postgres/convert-auto-increment-to-identitiy': ['off', convertAutoIncrementToIdentity],
    'convert-postgres-to-sqlite/convert-with-to-sequential': ['off', convertWithToSequential],
};
