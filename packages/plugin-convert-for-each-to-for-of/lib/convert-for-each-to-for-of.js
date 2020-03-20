'use strict';

const {
    template,
    operator,
    types,
} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
    traverse,
} = operator;

const forOfTemplate = template(`
  for (const %%item%% of %%items%%)
    %%body%%
`);

const {ContinueStatement} = types;
const {keys} = Object;
const isRoot = (path) => path.isFunction() || path.isProgram();

module.exports.report = () => `for-of should be used instead of forEach`;

module.exports.fix = (path) => {
    const {params, body} = path.node.arguments[0];
    const item = getItem(params);
    
    delete item.typeAnnotation;
    
    const newPath = replaceWith(path.parentPath, forOfTemplate({
        item,
        items: path.node.callee.object,
        body,
    }));
    
    fixReturn(newPath);
};

module.exports.include = () => {
    return [
        '__.forEach(__args)',
    ];
};

module.exports.filter = (path) => {
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
    
    // that's right, when we have two arguments, and first is this
    // we actually one argument + typescript typings
    if (params.length > 1 && !params[0].isIdentifier({name: 'this'}))
        return false;
    
    const [paramPath] = params;
    
    if (isSameNames(paramPath, objectPath))
        return false;
    
    const rootPath = path.findParent(isRoot);
    
    if (isBoundVars(rootPath, fnPath))
        return false;
    
    return true;
};

function isSameNames(paramPath, objectPath) {
    const {name} = paramPath.node;
    return objectPath.isIdentifier({name});
}

function fixReturn(path) {
    const {body} = path.node;
    
    traverse(path, {
        'return __'(path) {
            if (path.scope.block !== body)
                return;
            
            const {argument} = path.node;
            
            if (!argument)
                return replaceWith(path, ContinueStatement());
            
            replaceWithMultiple(path, [
                argument,
                ContinueStatement(),
            ]);
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

