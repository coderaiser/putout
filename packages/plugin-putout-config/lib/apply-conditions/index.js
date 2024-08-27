'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['remove-useless-else', 'conditions/remove-useless-else'],
    ['merge-if-statements', 'conditions/merge-if-statements'],
]);
