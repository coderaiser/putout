'use strict';

const {operator} = require('putout');
const {rename} = operator;

module.exports.report = () => `Use 'trigger()' instead of 'triggerValidation()'`;

module.exports.fix = (path) => {
    const program = path.scope.getProgramParent().path;
    rename(program, 'triggerValidation', 'trigger');
};

module.exports.include = () => [
    'triggerValidation(__args)',
];

module.exports.filter = (path) => path.scope.bindings.triggerValidation;
