'use strict';

const {createRenameProperty} = require('../rename-property');

const v37 = [
    ['remove-empty/import', 'esm/remove-empty-import'],
    ['remove-empty/export', 'esm/remove-empty-export'],
    ['group-imports-by-source', 'esm/group-imports-by-source'],
    ['declare-imports-first', 'esm/declare-imports-first'],
    ['remove-quotes-from-import-assertions', 'esm/remove-quotes-from-import-assertions'],
    ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
];

module.exports = createRenameProperty(v37);
