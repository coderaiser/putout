'use strict';

const {operator} = require('putout');
const {addParens} = operator;

module.exports.report = () => `Add missing parens: invalid tagged template on optional chain`;

module.exports.fix = (path) => {
    addParens(path);
};

module.exports.traverse = ({push}) => ({
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
