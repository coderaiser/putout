'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['apply-early-return', 'return/apply-early'],
    ['remove-useless-return', 'return/remove-useless'],
    ['simplify-boolean-return', 'return/simplify-boolean'],
    ['convert-break-to-return', 'return/convert-from-break'],
]);
