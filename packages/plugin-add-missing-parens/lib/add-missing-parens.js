'use strict';

module.exports.report = () => `Add missing parens: invalid tagged template on optional chain`;

module.exports.fix = (path) => {
    path.node.extra = {
        parenthesized: true,
    };
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
