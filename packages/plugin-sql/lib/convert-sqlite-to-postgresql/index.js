import * as convertLastInsertRowidToReturningId from './convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertAutoIncrementToIdentity from './convert-auto-increment-to-identitiy/index.js';

export const rules = {
    'convert-last-insert-rowid-to-returning-id': convertLastInsertRowidToReturningId,
    'convert-auto-increment-to-identity': convertAutoIncrementToIdentity,
};
