'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['convert-for-to-for-of', 'for-of/for'],
    ['convert-for-each-to-for-of', 'for-of/for-each'],
    ['convert-for-in-to-for-of', 'for-of/for-in'],
    ['convert-map-to-for-of', 'for-of/map'],
    ['convert-reduce-to-for-of', 'for-of/reduce'],
    ['remove-useless-for-of', 'for-of/remove-useless'],
    ['remove-unused-for-of-variables', 'for-of/remove-unused-variables'],
    ['remove-useless-array-from', 'for-of/remove-useless-array-from'],
    ['remove-useless-variables/for-of', 'for-of/remove-useless-variables"'],
]);
