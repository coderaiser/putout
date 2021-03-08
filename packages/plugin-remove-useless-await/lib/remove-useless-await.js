'use strict';

module.exports.report = () => `Useless await should be avoided`;

module.exports.replace = () => ({
    'await await __a': 'await __a',
    'await __a': '__a',
});

module.exports.filter = (path) => {
    const argumentPath = path.get('argument');
    
    if (argumentPath.isAwaitExpression())
        return true;
    
    if (!argumentPath.isCallExpression())
        return false;
    
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
    
    const {async} = fnPath.node;
    
    return !async;
};

