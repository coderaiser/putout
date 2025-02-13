'use strict';

const {operator, types} = require('putout');
const {compare} = operator;

const {
    isRestElement,
    isThisExpression,
    isSuper,
    isClass,
    isClassProperty,
    isClassPrivateProperty,
} = types;

module.exports.report = ({methodNode}) => {
    return `Avoid useless arguments from method '${methodNode.key.name}()'`;
};

module.exports.fix = ({path, methodNode}) => {
    const n = path.node.arguments.length - methodNode.params.length;
    path.node.arguments = path.node.arguments.slice(n);
};

module.exports.traverse = ({push}) => ({
    '__a.__b(__args)': (path) => {
        const fnParent = path.scope.getFunctionParent();
        
        if (!fnParent)
            return;
        
        const {parentPath} = fnParent.path.parentPath;
        
        if (!isClass(parentPath))
            return;
        
        const {callee} = path.node;
        const {object} = callee;
        
        if (!isSuper(object) && !isThisExpression(object))
            return;
        
        for (const methodNode of parentPath.node.body.body) {
            if (isClassProperty(methodNode))
                continue;
            
            if (isClassPrivateProperty(methodNode))
                continue;
            
            if (isRestElement(methodNode.params.at(-1)))
                continue;
            
            if (methodNode.kind === 'get')
                continue;
            
            if (!compare(methodNode.key, path.node.callee.property))
                continue;
            
            if (methodNode.params.length >= path.node.arguments.length)
                continue;
            
            push({
                path,
                methodNode,
            });
        }
    },
});
