'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {StringLiteral} = types;

module.exports.report = () => 'String should be used instead of Boolean';

module.exports.fix = (path) => {
    const {value} = path.node;
    const newValue = StringLiteral(value ? 'on' : 'off');
    
    replaceWith(path, newValue);
};

module.exports.include = () => ['BooleanLiteral'];
