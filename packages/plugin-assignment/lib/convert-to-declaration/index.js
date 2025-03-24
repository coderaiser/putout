'use strict';

const {types, operator} = require('putout');
const {
    variableDeclarator,
    isIdentifier,
    variableDeclaration,
} = types;

const {
    replaceWith,
    getBinding,
    isKeyword,
} = operator;

module.exports.report = (path) => {
    const {name} = path.node.left;
    return `Declare '${name}' before assignment`;
};

module.exports.fix = (path) => {
    const {left, right} = path.node;
    const node = variableDeclaration('const', [
        variableDeclarator(left, right),
    ]);
    
    replaceWith(path, node);
};

module.exports.traverse = ({push}) => ({
    AssignmentExpression(path) {
        const prevPath = path.parentPath.getPrevSibling();
        
        if (prevPath.isVariableDeclaration()) {
            const {name} = prevPath.node.declarations.at(-1).id;
            
            if (isKeyword(name))
                return;
        }
        
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
