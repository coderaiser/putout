'use strict';

const message = 'Keep curly braces on one line when you use destructuring as function argument';

const traverse = (context) => (node) => {
    const text = context
        .getSourceCode()
        .getText(node);
    
    if (!/\n/.test(text))
        return;
    
    context.report({
        node,
        message,
        fix: getFix(node, text),
    });
};

const getFix = (node, text) => (fixer) => {
    const fixed = text
        .replace(/\n/g, '')
        .replace(/ /g, '')
        .replace(/,/g, ', ')
        .replace(', }', '}');
    
    return [
        fixer.replaceText(node, fixed),
    ];
};

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: message,
            category: 'destructuring',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        // can't use because of an error
        // ':has(ArrowFunctionExpression, FunctionExpression, FunctionDeclaration) > .params[type=ObjectPattern]'
        // Error: Unknown node type JSXElement
        return {
            'ArrowFunctionExpression > .params[type=ObjectPattern]': traverse(context),
            'FunctionExpression > .params[type=ObjectPattern]': traverse(context),
            'FunctionDeclaration > .params[type=ObjectPattern]': traverse(context),
        };
    },
};

