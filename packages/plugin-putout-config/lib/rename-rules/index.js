'use strict';

const {createRenameProperty} = require('../rename-property');
const v29 = [
    ['declare-undefined-variables', 'declare'],
    ['apply-array-at', 'array-at'],
    ['apply-maybe', 'maybe'],
];

module.exports = createRenameProperty(v29);
