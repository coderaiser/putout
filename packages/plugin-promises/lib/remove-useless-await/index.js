'use strict';

const {operator} = require('putout');
const {traverse} = operator;

module.exports.report = () => `Avoid useless 'await'`;

module.exports.exclude = () => [
    'await new Promise(__args)',
    'await __a.__b?.(__args)',
    'await __a?.(__args)',
    'await __a(__args)?.__b(__args)',
    'await __a?.(__args).catch(__args)',
    'await import(__a)',
    'await import(__a, __b)',
];

module.exports.replace = () => ({
    'await await __a': 'await __a',
    'await __a': '__a',
});

module.exports.filter = (path) => {
    const argumentPath = path.get('argument');
    
    if (argumentPath.isTaggedTemplateExpression())
        return false;
    
    if (argumentPath.isAwaitExpression())
        return true;
    
    if (argumentPath.isIdentifier())
        return false;
    
    if (argumentPath.isLogicalExpression())
        return false;
    
    if (argumentPath.isMemberExpression())
        return false;
    
    if (!argumentPath.isCallExpression())
        return true;
    
    const calleePath = argumentPath.get('callee');
    
    if (!calleePath.isIdentifier())
        return false;
    
    const {name} = calleePath.node;
    const scope = argumentPath.scope.getBinding(name);
    
    if (!scope)
        return false;
    
    const fnPath = scope.path;
    
    if (!fnPath.isFunction())
        return false;
    
    if (looksLikePromise(fnPath))
        return false;
    
    if (isTypePromise(fnPath))
        return false;
    
    return !fnPath.node.async;
};

function isTypePromise(path) {
    const returnTypePath = path.get('returnType');
    
    if (!returnTypePath.node)
        return false;
    
    const typeNamePath = returnTypePath.get('typeAnnotation.typeName');
    
    if (!typeNamePath.isIdentifier())
        return false;
    
    return typeNamePath.node.name === 'Promise';
}

function looksLikePromise(path) {
    let is = false;
    
    const markFound = (path) => {
        is = true;
        path.stop();
    };
    
    traverse(path.node, {
        'new Promise(__a)': markFound,
        'Promise.__(__args)': markFound,
    });
    
    return is;
}
