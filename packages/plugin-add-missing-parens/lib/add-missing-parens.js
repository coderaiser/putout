'use strict';

const {types, operator} = require('putout');
const {AwaitExpression} = types;
const {replaceWith} = operator;

module.exports.report = () => `Add missing parens: invalid tagged template on optional chain`;

module.exports.fix = (path) => {
    if (path.isAwaitExpression()) {
        const {argument} = path.node;
        const newPath = replaceWith(path, argument);
        
        const objectPath = newPath.get('expression.callee.object');
        
        path = replaceWith(objectPath, AwaitExpression(objectPath.node));
    }
    
    path.node.extra = {
        parenthesized: true,
    };
};

module.exports.traverse = ({push}) => ({
    AwaitExpression(path) {
        const argPath = path.get('argument');
        
        if (argPath.isOptionalCallExpression() && argPath.get('callee').isOptionalMemberExpression())
            push(path);
    },
    TaggedTemplateExpression(path) {
        const tagPath = path.get('tag');
        
        if (tagPath.isOptionalCallExpression()) {
            const {parenthesized} = tagPath.node.extra || {};
            
            if (!parenthesized)
                return push(tagPath);
        }
        
        if (tagPath.isOptionalMemberExpression()) {
            const {parenthesized} = tagPath.node.extra || {};
            
            if (!parenthesized)
                return push(tagPath);
        }
        
        if (tagPath.isTSNonNullExpression()) {
            const expressionPath = tagPath.get('expression');
            const {parenthesized} = expressionPath.node.extra || {};
            
            if (!parenthesized)
                return push(expressionPath);
        }
    },
});
