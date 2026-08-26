import * as applyIsNotNull from './convert-postgres-to-sqlite/apply-json-type/index.js';
import * as applyJsonbExtractPathText from './convert-sqlite-to-postgres/apply-jsonb-extract-path-text/index.js';
import * as applyCount from './apply-count/index.js';
import * as convertSerialToIdentity from './postgres/convert-serial-to-identity/index.js';
import * as convertSequenceToSerial from './postgres/convert-sequence-to-serial/index.js';
import * as convertAutoIncrementToIdentity from './convert-sqlite-to-postgres/convert-auto-increment-to-identity/index.js';
import * as applyGenerateSeries from './postgres/apply-generate-series/index.js';
import * as convertLastInsertRowidToReturningId from './convert-sqlite-to-postgres/convert-last-insert-rowid-to-returnning-id/index.js';
import * as applyJsonExtract from './convert-postgres-to-sqlite/apply-json-extract/index.js';
import * as convertWithToSequential from './convert-postgres-to-sqlite/convert-with-to-sequential/index.js';
import * as applyAutoIncrement from './convert-postgres-to-sqlite/apply-auto-increment/index.js';
import * as convertLastvalToLastInsertRowid from './convert-postgres-to-sqlite//convert-lastval-to-last-insert-rowid/index.js';
import * as convertGenerateSeriesToWithRecursive from './convert-sqlite-to-postgres/convert-generate-series-to-with-recursive/index.js';

export const rules = {
    'apply-count': applyCount,
    'postgres/apply-generate-series': applyGenerateSeries,
    'postgres/convert-sequence-to-serial': convertSequenceToSerial,
    'postgres/convert-serial-to-identity': convertSerialToIdentity,
    'convert-sqlite-to-postgres/convert-last-insert-rowid-to-returning-id': ['off', convertLastInsertRowidToReturningId],
    'convert-sqlite-to-postgres/convert-auto-increment-to-identitiy': ['off', convertAutoIncrementToIdentity],
    'convert-sqlite-to-postgres/apply-jsonb-extract-path-text': ['off', applyJsonbExtractPathText],
    'convert-postgres-to-sqlite/apply-json-extract': ['off', applyJsonExtract],
    'convert-postgres-to-sqlite/convert-with-to-sequential': ['off', convertWithToSequential],
    'convert-postgres-to-sqlite/apply-auto-increment': ['off', applyAutoIncrement],
    'convert-postgres-to-sqlite/convert-lastval-to-last-insert-rowid': ['off', convertLastvalToLastInsertRowid],
    'convert-postgres-to-sqlite/convert-generate-series-to-with-recursive': ['off', convertGenerateSeriesToWithRecursive],
    'convert-postgres-to-sqlite/apply-json-type': ['off', applyIsNotNull],
};
