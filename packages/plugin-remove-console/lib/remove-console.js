'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Avoid 'console' call`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.filter = ({scope}) => !scope.hasBinding('console');

module.exports.include = () => [
    `console.__a(__args)`,
    `console[__a](__args)`,
];
