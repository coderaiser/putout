'use strict';

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep curly braces on one line when you use destructuring as function argument';

module.exports.filter = ({text}) => /\n/.test(text);

module.exports.fix = ({text}) => {
    return text
        .replace(/\n/g, '')
        .replace(/ /g, '')
        .replace(/,/g, ', ')
        .replace(', }', '}');
};

// can't use because of an error
// ':has(ArrowFunctionExpression, FunctionExpression, FunctionDeclaration) > .params[type=ObjectPattern]'
// Error: Unknown node type JSXElement
module.exports.include = () => [
    'ArrowFunctionExpression > .params[type=ObjectPattern]',
    'FunctionExpression > .params[type=ObjectPattern]',
    'FunctionDeclaration > .params[type=ObjectPattern]',
];
