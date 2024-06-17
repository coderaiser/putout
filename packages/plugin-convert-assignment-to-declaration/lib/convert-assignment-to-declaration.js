'use strict';

const {types, operator} = require('putout');
const {
    isIdentifier,
    VariableDeclarator,
    VariableDeclaration,
} = types;

const {replaceWith, getBinding} = operator;

module.exports.report = (path) => {
    const {name} = path.node.left;
    return `Declare '${name}' before assignment`;
};

module.exports.fix = (path) => {
    const {left, right} = path.node;
    const node = VariableDeclaration('const', [
        VariableDeclarator(left, right),
    ]);
    
    replaceWith(path, node);
};

module.exports.traverse = ({push}) => ({
    AssignmentExpression(path) {
        const {left} = path.node;
        
        if (!isIdentifier(left))
            return;
        
        const {name} = left;
        
        if (getBinding(path, name))
            return;
        
        if (!path.parentPath.isExpressionStatement())
            return;
        
        push(path);
    },
});
