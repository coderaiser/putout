import {types} from '@putout/babel';

export {getBindingPath, getBinding} from './get-binding.js';
export {isSimple} from './is-simple.js';
export {extract} from './extract.js';
export {compute} from './compute.js';
export {remove} from './remove.js';
export {getExportDefault} from './get-export-default.js';
export {rename} from './rename/index.js';
export {renameProperty} from './rename/rename-property.js';
export {setLiteralValue} from './set-literal-value.js';
export {getPathAfterRequires} from './get-path-after-requires.js';
export {
    traverseProperties,
    getProperties,
    getProperty,
} from './properties/index.js';
export {getLiteralRaw} from './get-literal-raw.js';
export {
    toExpression,
    replaceWithMultiple,
    replaceWith,
} from './replace-with/index.js';

const {
    matchesPattern,
    isImportDeclaration,
    isExportDeclaration,
    isStatement,
    expressionStatement,
} = types;

export const insertBefore = (path, node) => {
    path.insertBefore(node);
};

export const insertAfter = (path, node) => {
    const {comments} = path.node;
    
    if (path.node.trailingComments?.length && path.getNextSibling()?.node?.leadingComments)
        delete path.node.trailingComments;
    
    if (node.trailingComments)
        delete node.trailingComments;
    
    if (isStatement(path) && !isStatement(node))
        path.insertAfter(expressionStatement(node));
    else
        path.insertAfter(node);
    
    path.node.comments = comments;
};

export const isModuleExports = (path) => {
    return matchesPattern(path.node || path, 'module.exports');
};

const isBinding = (name) => (path) => path.scope.bindings[name];

export const findBinding = (path, name) => {
    const referencePath = path.findParent(isBinding(name));
    
    if (!referencePath)
        return null;
    
    return referencePath.scope.bindings[name];
};

export const getPathAfterImports = (body) => {
    const n = body.length;
    let i = 0;
    
    while (i < n - 1 && isImportDeclaration(body[i]))
        ++i;
    
    return body[i];
};

export const isESM = (path) => {
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    
    for (const node of programPath.node.body) {
        if (isImportDeclaration(node))
            return true;
        
        if (isExportDeclaration(node))
            return true;
    }
    
    return false;
};
