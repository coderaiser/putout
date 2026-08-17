import * as applyCount from './apply-count/index.js';
import * as convertSerialToIdentity from './postgres/convert-serial-to-identity/index.js';
import * as convertSequenceToSerial from './postgres/convert-sequence-to-serial/index.js';
import * as convertAutoIncrementToIdentity from './convert-sqlite-to-postgres/convert-auto-increment-to-identity/index.js';
import * as convertLastInsertRowidToReturningId from './convert-sqlite-to-postgres/convert-last-insert-rowid-to-returnning-id/index.js';
import * as convertWithToSequential from './convert-postgres-to-sqlite/convert-with-to-sequential/index.js';
import * as applyAutoIncrement from './convert-postgres-to-sqlite/apply-auto-increment/index.js';
import * as convertLastvalToLastInsertRowid from './convert-postgres-to-sqlite//convert-lastval-to-last-insert-rowid/index.js';

export const rules = {
    'apply-count': applyCount,
    'postgres/convert-sequence-to-serial': convertSequenceToSerial,
    'postgres/convert-serial-to-identity': convertSerialToIdentity,
    'convert-sqlite-to-postgres/convert-last-insert-rowid-to-returning-id': ['off', convertLastInsertRowidToReturningId],
    'convert-sqlite-to-postgres/convert-auto-increment-to-identitiy': ['off', convertAutoIncrementToIdentity],
    'convert-postgres-to-sqlite/convert-with-to-sequential': ['off', convertWithToSequential],
    'convert-postgres-to-sqlite/apply-auto-increment': ['off', applyAutoIncrement],
    'convert-postgres-to-sqlite/convert-lastval-to-last-insert-rowid': ['off', convertLastvalToLastInsertRowid],
};
