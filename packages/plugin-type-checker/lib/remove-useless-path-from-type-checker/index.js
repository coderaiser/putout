import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
    isMemberExpression,
    isVariableDeclarator,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withoutNot = removePath(value, where);
    
    return `Avoid useless 'path': '${value}' -> '${withoutNot}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, removePath(value, where));
};
export const traverse = ({push}) => ({
    StringLiteral(path) {
        const call = path.find(isCallExpression);
        
        if (!call)
            return;
        
        if (!isIdentifier(call.node.callee, {name: 'createTypeChecker'}))
            return;
        
        if (!isPathPassed(call))
            return;
        
        const {value} = path.node;
        const where = createWhere(value);
        
        if (where.length)
            push({
                path,
                where,
            });
    },
});

function createWhere(value) {
    const where = [];
    const includes = value.includes.bind(value);
    const endsWith = value.endsWith.bind(value);
    const push = where.push.bind(where);
    
    const tools = {
        push,
        includes,
        endsWith,
    };
    
    if (includes('path.'))
        tracePath(tools);
    
    return where;
}

function tracePath({push, includes}) {
    if (includes('path.'))
        push('path');
}

function removePath(value, where) {
    if (where.includes('path'))
        value = value.replace('path.', '');
    
    return value;
}

// 'path.' can be removed only when checker always receives a path
function isPathPassed(call) {
    const {parentPath} = call;
    
    if (parentPath.isCallExpression({callee: call.node}))
        return isPath(parentPath.node.arguments[0]);
    
    if (!isVariableDeclarator(parentPath))
        return false;
    
    if (parentPath.parentPath.parentPath.isExportNamedDeclaration())
        return false;
    
    const binding = call.scope.getBinding(parentPath.node.id.name);
    
    return isEveryCallWithPath(binding.referencePaths);
}

function isEveryCallWithPath(references) {
    if (!references.length)
        return false;
    
    for (const {parentPath, node} of references) {
        if (parentPath.isExportSpecifier())
            return false;
        
        if (!parentPath.isCallExpression({callee: node}))
            return false;
        
        if (!isPath(parentPath.node.arguments[0]))
            return false;
    }
    
    return true;
}

function isPath(node) {
    if (isIdentifier(node, {name: 'path'}))
        return true;
    
    if (!isMemberExpression(node, {computed: false}))
        return false;
    
    return isIdentifier(node.property, {
        name: 'path',
    });
}
