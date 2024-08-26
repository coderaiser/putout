'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['strict-mode/add-missing', 'nodejs/add-missing-strict-mode'],
    ['strict-mode/remove-useless', 'nodejs/remove-useless-strict-mode'],
]);
