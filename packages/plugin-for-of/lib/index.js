'use strict';

const map = require('./map');
const forEach = require('./for-each');
const forN = require('./for-n');
const forLength = require('./for-length');
const forEntries = require('./for-entries');
const forEntriesN = require('./for-entries-n');
const forInNegative = require('./for-in-negative');
const forInPositive = require('./for-in-positive');
const reduce = require('./reduce');
const removeUseless = require('./remove-useless');
const removeUselessVariables = require('./remove-useless-variables');
const removeUselessArrayFrom = require('./remove-useless-array-from');
const removeUnusedVariables = require('./remove-unused-variables');
const addMissingDeclaration = require('./add-missing-declaration');
const toForN = require('./to-for-n');

module.exports.rules = {
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
