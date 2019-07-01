'use strict';

const {
    template,
    operate,
    types,
} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
} = operate;

const forOfTemplate = template(`
  for (const %%item%% of %%items%%)
    %%body%%
`);

const {
    ExpressionStatement,
    ContinueStatement,
} = types;

const {keys} = Object;

const isRoot = (path) => path.isFunction() || path.isProgram();

module.exports.report = () => `for-of should be used instead of forEach`;

module.exports.fix = (path) => {
    const {parentPath} = path;
    const {params, body} = parentPath.node.arguments[0];
    const item = getItem(params);
    delete item.typeAnnotation;
    
    const [newPath] = replaceWith(parentPath.parentPath, forOfTemplate({
        item,
        items: path.node.object,
        body,
    }));
    
    fixReturn(newPath);
};

module.exports.traverse = ({push}) => {
    return {
        MemberExpression(path) {
            const {parentPath} = path;
            const propertyPath = path.get('property');
            const objectPath = path.get('object');
            
            if (!propertyPath.isIdentifier({name: 'forEach'}))
                return;
            
            const fnPath = parentPath.get('arguments.0');
            
            if (!fnPath.isFunction())
                return;
            
            const params = fnPath.get('params');
            
            if (!params.length)
                return;
            
            if (isParentContainsFunctionArgument(objectPath))
                return;
            
            if (parentPath.node.arguments.length === 2 && !parentPath.get('arguments.1').isThisExpression())
                return;
            
            // that's right, when we have two arguments, and first is this
            // we actually one argument + typescript typings
            if (params.length > 1 && !params[0].isIdentifier({name: 'this'}))
                return;
            
            const rootPath = path.findParent(isRoot);
            
            if (isBoundVars(rootPath, fnPath))
                return;
            
            push(path);
        },
    };
};

function fixReturn(path) {
    const {body} = path.node;
    
    path.traverse({
        ReturnStatement(path) {
            if (path.scope.block !== body)
                return;
            
            const exp = ExpressionStatement(path.node.argument);
            replaceWithMultiple(path, [exp, ContinueStatement()]);
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

