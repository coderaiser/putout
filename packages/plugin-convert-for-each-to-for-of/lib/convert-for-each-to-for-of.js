'use strict';

const {replaceWith} = require('putout').operate;

const {template} = require('putout');

const forOfTemplate = template(`
  for (const %%item%% of %%items%%) {
    %%body%%
  }
`);

module.exports.report = () => `for-of should be used instead of forEach`;

module.exports.fix = (path) => {
    const {parentPath} = path;
    const {params, body} = parentPath.node.arguments[0];
    const item = getItem(params);
    
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
            
            const argPath = parentPath.get('arguments.0');
            
            if (!argPath.isFunction())
                return;
            
            if (!argPath.get('params').length)
                return;
            
            if (isParentContainsFunctionArgument(objectPath))
                return;
            
            if (parentPath.node.arguments.length === 2 && !parentPath.get('arguments.1').isThisExpression())
                return;
            
            push(path);
        },
    };
};

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

