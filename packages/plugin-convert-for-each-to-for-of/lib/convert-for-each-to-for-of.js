'use strict';

const {
    template,
    operate,
} = require('putout');

const {replaceWith} = operate;

const forOfTemplate = template(`
  for (const %%item%% of %%items%%)
    %%body%%
`);

const {keys} = Object;

const isRoot = (path) => path.isFunction() || path.isProgram();

module.exports.report = () => `for-of should be used instead of forEach`;

module.exports.fix = (path) => {
    const {parentPath} = path;
    const {params, body} = parentPath.node.arguments[0];
    const item = getItem(params);
    delete item.typeAnnotation;
    
    replaceWith(parentPath.parentPath, forOfTemplate({
        item,
        items: path.node.object,
        body,
    }));
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
            
            if (!fnPath.get('params').length)
                return;
            
            if (isParentContainsFunctionArgument(objectPath))
                return;
            
            if (parentPath.node.arguments.length === 2 && !parentPath.get('arguments.1').isThisExpression())
                return;
            
            const rootPath = path.findParent(isRoot);
            
            if (isBoundVars(rootPath, fnPath))
                return;
            
            push(path);
        },
    };
};

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

