export const category = 'destructuring';
export const report = () => 'Keep curly braces on one line when you use destructuring as function argument';

export const filter = ({text}) => /\n/.test(text);

export const fix = ({text}) => {
    return text
        .replace(/\n/g, '')
        .replace(/ /g, '')
        .replace(/,/g, ', ')
        .replace(', }', '}');
};

// can't use because of an error// ':has(ArrowFunctionExpression, FunctionExpression, FunctionDeclaration) > .params[type=ObjectPattern]'// Error: Unknown node type JSXElement
export const include = () => [
    'ArrowFunctionExpression > .params[type=ObjectPattern]',
    'FunctionExpression > .params[type=ObjectPattern]',
    'FunctionDeclaration > .params[type=ObjectPattern]',
];
