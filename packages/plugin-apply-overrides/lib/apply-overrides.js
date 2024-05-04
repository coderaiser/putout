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
    isIdentifier,
} = types;

const createOverrides = template('const %%overrides%% = overrides');

module.exports.report = () => `Use variable 'overrides' instead of destructuring function argument`;
module.exports.fix = (path) => {
    const {node} = path;
    const {right} = node;
    
    replaceWith(path, AssignmentPattern(Identifier('overrides'), right));
    path.parentPath.node.body.body.unshift(createOverrides({
        overrides: node.left,
    }));
};
module.exports.traverse = ({push}) => ({
    Function(path) {
        const params = path.get('params');
        const {length} = params;
        
        if (length < 3)
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
    
    let count = 0;
    
    for (const prop of path.get('properties')) {
        if (!isAssignmentPattern(prop.node.value))
            continue;
        
        const {right} = prop.node.value;
        
        if (isIdentifier(right))
            ++count;
    }
    
    return count;
}
