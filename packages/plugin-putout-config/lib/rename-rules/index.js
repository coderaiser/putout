'use strict';

const {createRenameProperty} = require('../rename-property');
const v29 = [
    ['declare-undefined-variables', 'declare'],
    ['apply-array-at', 'array-at'],
    ['apply-maybe', 'maybe'],
];

const v26 = [
    ['strict-mode/add', 'strict-mode/add-missing'],
    ['strict-mode/remove', 'strict-mode/remove-useless'],
];

module.exports = createRenameProperty([
    ...v29,
    ...v26,
]);
