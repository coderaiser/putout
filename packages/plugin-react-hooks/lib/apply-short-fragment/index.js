'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    JSXClosingFragment,
    JSXOpeningFragment,
    JSXFragment,
} = types;

const {replaceWith} = operator;

module.exports.report = () => `Apply shorthand syntax for 'Fragment'`;

module.exports.include = () => [
    'JSXOpeningElement',
];

module.exports.fix = (path) => {
    const {parentPath} = path;
    const {children} = path.parentPath.node;
    
    replaceWith(parentPath, JSXFragment(
        JSXOpeningFragment(),
        JSXClosingFragment(),
        children,
    ));
};

module.exports.filter = (path) => {
    if (path.node.attributes.length)
        return false;
    
    const namePath = path.get('name');
    
    if (namePath.isJSXIdentifier({name: 'Fragment'}))
        return true;
    
    if (!namePath.isJSXMemberExpression())
        return false;
    
    if (namePath.node.object.name !== 'React')
        return false;
    
    if (namePath.node.property.name !== 'Fragment')
        return false;
    
    return true;
};

