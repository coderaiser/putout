import {operator} from 'putout';
import getVars from './get-vars/index.js';
import transform from './transform.js';
import getUnused from './get-unused.js';

const {
    replaceWith,
    compare,
    remove,
} = operator;

export const report = ({name}) => `'${name}' is defined but never used`;

export const fix = ({path}) => {
    if (compare(path, 'const __a = __b = __c'))
        return replaceWith(path.parentPath, path.node.init);
    
    if (isOneImport(path))
        return remove(path.parentPath);
    
    remove(path);
};

export const find = (ast, {traverse}) => {
    const vars = getVars(ast, {
        setPath: true,
        traverse,
    });
    
    const transformed = transform(vars);
    
    return getUnused(transformed);
};

function isOneImport({parentPath}) {
    if (!parentPath.isImportDeclaration())
        return false;
    
    return parentPath.node.specifiers.length === 1;
}
