'use strict';

const {types, operate} = require('putout');
const {replaceWith} = operate;
const {AwaitExpression} = types;

module.exports.report = () => `"return await promise()" should be used instead of "return promise()"`;

module.exports.fix = (path) => {
    const argumentPath = path.get('argument');
    const {node} = argumentPath;
    
    replaceWith(argumentPath, AwaitExpression(node));
};

module.exports.include = () => [
    'return __()',
];

module.exports.exclude = () => [
    'return await __()',
];

module.exports.filter = (path) => {
    const argumentPath = path.get('argument');
    
    const {
        state,
        node,
        scope,
    } = argumentPath;
    
    if (!scope.block.async)
        return false;
    
    const calleePath = argumentPath.get('callee');
    const {name} = node.callee;
    const {references} = state;
    
    for (const ref of references) {
        if (ref === calleePath)
            continue;
        
        if (!ref.scope.block.async)
            return false;
        
        const {id} = ref.scope.block;
        
        if (name === id.name)
            return true;
    }
    
    return false;
};

