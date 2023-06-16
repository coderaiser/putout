'use strict';

const {operator, types} = require('putout');

const {TSAsExpression} = types;
const {replaceWith} = operator;

module.exports.report = () => '"as" should be used for type assertions';

module.exports.fix = (path) => {
    const typeName = path.get('typeAnnotation').node;
    const expression = path.get('expression').node;
    
    replaceWith(path, TSAsExpression(expression, typeName));
};

module.exports.include = () => [
    'TSTypeAssertion',
];
