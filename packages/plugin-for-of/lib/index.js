import * as map from './map/index.js';
import * as forEach from './for-each/index.js';
import * as forN from './for-n/index.js';
import * as forLength from './for-length/index.js';
import * as forEntries from './for-entries/index.js';
import * as forEntriesN from './for-entries-n/index.js';
import * as forInNegative from './for-in-negative/index.js';
import * as forInPositive from './for-in-positive/index.js';
import * as reduce from './reduce/index.js';
import * as removeUseless from './remove-useless/index.js';
import * as removeUselessVariables from './remove-useless-variables/index.js';
import * as removeUselessArrayFrom from './remove-useless-array-from/index.js';
import * as removeUnusedVariables from './remove-unused-variables/index.js';
import * as addMissingDeclaration from './add-missing-declaration/index.js';
import * as toForN from './to-for-n/index.js';

export const rules = {
    map,
    'for-each': forEach,
    'for-n': forN,
    'for-length': forLength,
    'for-entries': forEntries,
    'for-entries-n': forEntriesN,
    'for-in-negative': forInNegative,
    'for-in-positive': forInPositive,
    reduce,
    'remove-useless': removeUseless,
    'remove-useless-variables': removeUselessVariables,
    'remove-useless-array-from': removeUselessArrayFrom,
    'remove-unused-variables': removeUnusedVariables,
    'add-missing-declaration': addMissingDeclaration,
    'to-for-n': toForN,
};
