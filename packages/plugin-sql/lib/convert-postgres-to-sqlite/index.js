import * as convertWithToSequential from './convert-with-to-sequential/index.js';
import * as applyAutoIncrement from './apply-auto-increment/index.js';
import * as convertLastvalToInsertRowid from './convert-lastval-to-last-insert-rowid/index.js';
import * as convertGenerateSeriesToWithRecursive from './convert-generate-series-to-with-recursive/index.js';

export const rules = {
    'apply-auto-increment': applyAutoIncrement,
    'convert-with-to-sequential': convertWithToSequential,
    'convert-lastval-to-last-insert-rowid': convertLastvalToInsertRowid,
    'convert-generate-series-to-with-recursive': convertGenerateSeriesToWithRecursive,
};
