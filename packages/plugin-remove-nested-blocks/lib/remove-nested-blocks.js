import {types, operator} from 'putout';

const {
    isReturnStatement,
    isExportNamedDeclaration,
} = types;

const {replaceWithMultiple} = operator;
const {keys} = Object;

export const report = () => 'Avoid nested blocks';

export const fix = (path) => {
    replaceWithMultiple(path, path.node.body);
};

export const include = () => [
    'BlockStatement',
];

export const filter = (path) => {
    const prev = path.getPrevSibling();
    
    if (isExportNamedDeclaration(prev))
        return false;
    
    if (isReturnWithoutArg(path))
        return false;
    
    const {parentPath} = path;
    const {bindings} = path.scope;
    
    const isSwitch = parentPath.isSwitchCase();
    const varsCount = keys(bindings).length;
    
    if (isSwitch && !varsCount)
        return true;
    
    if (isSwitch)
        return false;
    
    if (!parentPath.isBlockStatement() && !parentPath.isProgram())
        return false;
    
    if (!isIntersect(parentPath, bindings))
        return true;
    
    return path.container.length === 1;
};

function isReturnWithoutArg(path) {
    const prevPath = path.getPrevSibling();
    
    if (!isReturnStatement(prevPath))
        return false;
    
    return !prevPath.node.argument;
}

const isIntersect = (path, bindings) => {
    for (const key of keys(bindings)) {
        if (path.scope.hasBinding(key))
            return true;
    }
    
    return false;
};
