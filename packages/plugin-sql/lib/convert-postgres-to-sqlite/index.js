import * as applyJsonType from './apply-json-type/index.js';
import * as applyJsonExtract from './apply-json-extract/index.js';
import * as convertWithToSequential from './convert-with-to-sequential/index.js';
import * as applyAutoIncrement from './apply-auto-increment/index.js';
import * as convertLastvalToInsertRowid from './convert-lastval-to-last-insert-rowid/index.js';

export const rules = {
    'apply-auto-increment': applyAutoIncrement,
    'apply-json-extract': applyJsonExtract,
    'apply-json-type': applyJsonType,
    'convert-with-to-sequential': convertWithToSequential,
    'convert-lastval-to-last-insert-rowid': convertLastvalToInsertRowid,
};
