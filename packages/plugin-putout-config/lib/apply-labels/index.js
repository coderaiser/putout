'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['remove-unused-labels', 'labels/remove-unused'],
    ['convert-label-to-object', 'labels/convert-to-object'],
]);
