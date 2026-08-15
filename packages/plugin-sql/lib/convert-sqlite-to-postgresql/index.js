import * as convertLastInsertRowidToReturnningId from './convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertAutoIncrementToIdentitiy from './convert-auto-increment-to-identitiy/index.js';

export const rules = {
    'convert-last-insert-rowid-to-returnning-id': convertLastInsertRowidToReturnningId,
    'convert-auto-increment-to-identitiy': convertAutoIncrementToIdentitiy,
};
