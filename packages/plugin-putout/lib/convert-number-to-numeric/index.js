'use strict';

const {operator} = require('putout');
const {rename} = operator;

module.exports.report = () => `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`;

module.exports.fix = (path) => {
    const bindings = path.scope.getAllBindings();
    const {name} = path.node.callee;
    const program = path.scope.getProgramParent().path;
    
    if (!bindings.isNumericLiteral)
        rename(program, 'isNumberLiteral', 'isNumericLiteral');
    
    if (!bindings.NumericLiteral)
        rename(program, 'NumberLiteral', 'NumericLiteral');
    
    path.node.callee.name = name.replace('Number', 'Numeric');
};

module.exports.include = () => [
    'isNumberLiteral(__a)',
    'NumberLiteral(__a)',
];
