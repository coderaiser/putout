'use strict';

const {
    template,
    operator,
    types,
} = require('putout');

const {
    isIdentifier,
    continueStatement,
} = types;

const {
    replaceWith,
    replaceWithMultiple,
    traverse,
} = operator;

const forOfTemplate = template(`
  for (const %%item%% of %%items%%)
    %%body%%
`);

const forOfEntriesTemplate = template(`
  for (const [%%index%%, %%item%%] of %%items%%.entries())
    %%body%%
`);

const {keys} = Object;
const isRoot = (path) => path.isFunction() || path.isProgram();

module.exports.report = () => `Use 'for-of' instead of 'forEach()'`;

module.exports.replace = () => ({
    '__.forEach.call(__a, (__b) => __body)': 'for (const __b of __a) __body',
    '__.forEach(__args)': (vars, path) => {
        const {params, body} = path.node.arguments[0];
        
        const item = getItem(params);
        
        delete item.typeAnnotation;
        
        const {length} = params;
        
        const thisPassed = isIdentifier(params[0], {
            name: 'this',
        });
        
        const items = path.node.callee.object;
        
        if (length === 1 || length === 2 && thisPassed) {
            const newPath = replaceWith(path, forOfTemplate({
                item,
                items,
                body,
            }));
            
            fixReturn(newPath);
            
            return;
        }
        
        if (params.length === 2) {
            const [, index] = params;
            
            const newPath = replaceWith(path, forOfEntriesTemplate({
                index,
                item,
                items,
                body,
            }));
            
            fixReturn(newPath);
        }
    },
});

module.exports.match = () => ({
    '__.forEach(__args)': (vars, path) => {
        const {parentPath} = path;
        
        if (parentPath.isSequenceExpression())
            return false;
        
        if (parentPath.isConditionalExpression())
            return false;
        
        if (parentPath.isVariableDeclarator())
            return false;
        
        const objectPath = path.get('callee.object');
        const fnPath = path.get('arguments.0');
        
        if (!fnPath.isFunction())
            return false;
        
        const params = fnPath.get('params');
        
        if (!params.length)
            return false;
        
        if (isParentContainsFunctionArgument(objectPath))
            return false;
        
        if (path.node.arguments.length === 2 && !path.get('arguments.1').isThisExpression())
            return false;
        
        // this is the case when "i" declared and "this"
        if (params.length >= 3 && params[0].isIdentifier({name: 'this'}))
            return false;
        
        const [paramPath] = params;
        
        if (isSameNames(paramPath, objectPath))
            return false;
        
        const rootPath = path.findParent(isRoot);
        
        return !isBoundVars(rootPath, fnPath);
    },
});

function isSameNames(paramPath, objectPath) {
    const {name} = paramPath.node;
    
    return objectPath.isIdentifier({
        name,
    });
}

function fixReturn(path) {
    traverse(path, {
        'return __'(path) {
            if (!isForBeforeFnUp(path))
                return;
            
            const {argument} = path.node;
            
            if (!argument)
                return replaceWith(path, continueStatement());
            
            replaceWithMultiple(path, [argument, continueStatement()]);
        },
    });
}

function isBoundVars(parentPath, path) {
    const currentBindings = keys(parentPath.scope.bindings);
    const fnBindings = keys(path.scope.bindings);
    
    return compare(currentBindings, fnBindings);
}

function isParentContainsFunctionArgument(objectPath) {
    if (!objectPath.isCallExpression())
        return false;
    
    for (const argPath of objectPath.get('arguments')) {
        if (argPath.isFunction())
            return true;
    }
}

function getItem(params) {
    const [thisItem, item] = params;
    
    if (params[0].name === 'this')
        return item;
    
    return thisItem;
}

function compare(a, b) {
    for (const el of a) {
        if (b.includes(el))
            return true;
    }
    
    return false;
}

function isForBeforeFnUp(path) {
    let wasForOf = false;
    let wasFn = false;
    
    while (path = path.parentPath) {
        if (path.isFunction())
            wasFn = true;
        
        if (path.isForOfStatement())
            wasForOf = true;
        
        if (wasForOf && wasFn)
            return true;
        
        if (wasFn && !wasForOf)
            return false;
    }
    
    return true;
}
