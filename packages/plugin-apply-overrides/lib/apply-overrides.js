'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {replaceWith} = operator;
const {
    Identifier,
    AssignmentPattern,
    isAssignmentPattern,
    isFunction,
    BlockStatement,
    isBlockStatement,
    ReturnStatement,
} = types;

const createOverrides = template('const %%overrides%% = overrides');

module.exports.report = () => `Use variable 'overrides' instead of destructuring function argument`;
module.exports.fix = (path) => {
    const {node, parentPath} = path;
    const {right} = node;
    
    replaceWith(path, AssignmentPattern(Identifier('overrides'), right));
    
    const {body} = parentPath.node;
    
    if (!isBlockStatement(body))
        parentPath.node.body = BlockStatement([ReturnStatement(body)]);
    
    path.parentPath.node.body.body.unshift(createOverrides({
        overrides: node.left,
    }));
};

module.exports.traverse = ({push}) => ({
    Function(path) {
        const params = path.get('params');
        const {length} = params;
        
        if (isFunction(path.node.body))
            return;
        
        if (!length)
            return;
        
        if (path.scope.bindings.overrides)
            return;
        
        const lastArg = params.at(-1);
        
        if (!lastArg.isAssignmentPattern())
            return;
        
        const left = lastArg.get('left');
        
        if (checkObjectPattern(left))
            push(lastArg);
    },
});

function checkObjectPattern(path) {
    if (!path.isObjectPattern())
        return false;
    
    const properties = path.get('properties');
    
    if (properties.length < 2)
        return false;
    
    let count = 0;
    
    for (const prop of properties) {
        if (!isAssignmentPattern(prop.node.value))
            continue;
        
        ++count;
    }
    
    return count;
}
