'use strict';

const {operator} = require('putout');
const {rename} = operator;

module.exports.report = () => `Use 'clearErrors' instead of 'clearError'`;

module.exports.fix = (path) => {
    const program = path.scope.getProgramParent().path;
    rename(program, 'clearError', 'clearErrors');
};

module.exports.include = () => [
    'clearError(__args)',
];
