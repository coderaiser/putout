import * as mergeDuplicateImportsJoin from './join/index.js';
import * as mergeDuplicateImportsRename from './rename/index.js';

export const rules = {
    'merge-duplicate-imports-join': mergeDuplicateImportsJoin,
    'merge-duplicate-imports-rename': mergeDuplicateImportsRename,
};
