import {
    template,
    operator,
    types,
} from 'putout';

const {
    isIdentifier,
    continueStatement,
    isReturnStatement,
} = types;

const {
    compare,
    getTemplateValues,
    replaceWith,
    replaceWithMultiple,
    superTraverse,
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

export const report = () => `Use 'for-of' instead of 'forEach()'`;

export const fix = (path) => {
    if (compare(path, '__.forEach.call(__a, (__b) => __body)')) {
        const {
            __a,
            __b,
            __body,
        } = getTemplateValues(path, '__.forEach.call(__a, (__b) => __body)');
        
        replaceWith(path, forOfTemplate({
            item: __b,
            items: __a,
            body: __body,
        }));
        
        return;
    }
    
    const {params, body} = path.node.arguments[0];
    const item = getItem(params);
    
    delete item.typeAnnotation;
    
    const {length} = params;
    
    for (const param of params) {
        delete param.typeAnnotation;
    }
    
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
    
    const [, index] = params;
    
    const newPath = replaceWith(path, forOfEntriesTemplate({
        index,
        item,
        items,
        body,
    }));
    
    fixReturn(newPath);
};

export const traverse = ({push}) => ({
    '__.forEach.call(__a, (__b) => __body)': push,
    '__.forEach(__args)': (path) => {
        const {parentPath} = path;
        
        if (isReturnStatement(parentPath))
            return;
        
        if (parentPath.isSequenceExpression())
            return;
        
        if (parentPath.isConditionalExpression())
            return;
        
        if (parentPath.isVariableDeclarator())
            return;
        
        const objectPath = path.get('callee.object');
        const fnPath = path.get('arguments.0');
        
        if (!fnPath.isFunction())
            return;
        
        const params = fnPath.get('params');
        
        if (!params.length)
            return;
        
        if (isParentContainsFunctionArgument(objectPath))
            return;
        
        const {length} = path.node.arguments;
        
        if (length === 2 && !path.get('arguments.1').isThisExpression())
            return;
        
        if (isIndexWithThis(params))
            return;
        
        const [paramPath] = params;
        
        if (isSameNames(paramPath, objectPath))
            return;
        
        const rootPath = path.findParent(isRoot);
        
        if (isBoundVars(rootPath, fnPath))
            return;
        
        if (length === 1) {
            push(path);
            return;
        }
        
        if (params.length === 2)
            push(path);
    },
});

function isSameNames(paramPath, objectPath) {
    const {name} = paramPath.node;
    
    return objectPath.isIdentifier({
        name,
    });
}

function fixReturn(path) {
    superTraverse(path, {
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
    
    return compareBindings(currentBindings, fnBindings);
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

function compareBindings(a, b) {
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

function isIndexWithThis(params) {
    if (params.length < 3)
        return false;
    
    const [first] = params;
    
    return first.isIdentifier({
        name: 'this',
    });
}
