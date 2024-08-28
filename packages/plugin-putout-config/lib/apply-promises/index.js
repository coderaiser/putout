'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['remove-useless-variables/await', 'promises/remove-useless-variables'],
]);
