import {
    types,
    operator,
    template,
} from 'putout';

const {
    returnStatement,
    blockStatement,
    identifier,
    isAssignmentPattern,
    isFunction,
    isBlockStatement,
    assignmentPattern,
} = types;

const {replaceWith} = operator;

const createOverrides = template('const %%overrides%% = overrides');

export const report = () => `Use variable 'overrides' instead of destructuring function argument`;
export const fix = (path) => {
    const {node, parentPath} = path;
    const {right} = node;
    
    replaceWith(path, assignmentPattern(identifier('overrides'), right));
    
    const {body} = parentPath.node;
    
    if (!isBlockStatement(body))
        parentPath.node.body = blockStatement([returnStatement(body)]);
    
    path.parentPath.node.body.body.unshift(createOverrides({
        overrides: node.left,
    }));
};

export const traverse = ({push}) => ({
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
