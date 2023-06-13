'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'Avoid useless empty static blocks';

module.exports.fix = (path) => remove(path);

module.exports.filter = (path) => !path.node.body.length;

module.exports.include = () => [
    'StaticBlock',
];
