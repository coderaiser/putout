'use strict';

const {replaceWith} = require('putout').operate;

module.exports.report = () => `Double negation should not be used in conditions`;

module.exports.fix = ({path, argument}) => {
    replaceWith(path, argument);
};

module.exports.traverse = ({push}) => {
    return {
        UnaryExpression(path) {
            const {parentPath} = path;
            
            if (path.node.operator !== '!')
                return;
            
            const isExpression = parentPath.parentPath.isExpressionStatement();
            
            const isIf = parentPath.isIfStatement();
            const isLogical = isExpression && parentPath.isLogicalExpression();
            const isConditional = isExpression && parentPath.isConditionalExpression();
            
            if (!isIf && !isLogical && !isConditional)
                return;
            
            const argumentPath = path.get('argument');
            
            if (!argumentPath.isUnaryExpression({operator: '!'}))
                return;
            
            const {argument} = argumentPath.node;
            
            push({
                path,
                argument,
            });
        },
    };
};
