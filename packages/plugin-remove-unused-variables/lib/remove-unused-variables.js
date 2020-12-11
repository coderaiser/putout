'use strict';

const {operator} = require('putout');
const {
    replaceWith,
    compare,
    remove,
} = operator;

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');

const {
    useParamsBeforeLastUsed,
    usePropertiesBeforeRest,
} = require('./get-vars/use-params');

const {values} = Object;

module.exports.report = ({name}) => `"${name}" is defined but never used`;

module.exports.fix = ({path}) => {
    if (compare(path, 'const __a = __b = __c'))
        return replaceWith(path.parentPath, path.node.init);
    
    if (isOneImport(path))
        return path.parentPath.remove();
    
    remove(path);
};

module.exports.traverse = ({push}) => {
    debugger;
    const {tree, allParams, use, isUsed,} = getVars({
        setPath: true,
    });
    
    const exit = getExit({
        push,
        use,
        isUsed,
        allParams
    });
    
    return {
        ...tree,
        Program: {
            exit,
        }
    }
};

function getExit({push, allParams, use, isUsed}) {
    return () => {
        const vars = allParams
            .map(useParamsBeforeLastUsed({
                use,
                isUsed,
            }))
            .map(usePropertiesBeforeRest({
                use,
            }));
        
        const transformed = transform(values(vars));
        const unused = getUnused(transformed);
        
        unused.map(push);
    };
}

function isOneImport({parentPath}) {
    if (!parentPath.isImportDeclaration())
        return false;
    
    return parentPath.node.specifiers.length === 1;
}
