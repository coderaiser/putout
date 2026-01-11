export const report = () => {
    return `Unexpected new lines around arguments`;
};

export const fix = ({text, node, getText}) => {
    const {body} = node.body;
    
    node.body.body = [];
    
    const paramsText = getText(node);
    
    node.body.body = body;
    
    const newText = paramsText
        .replace(/\(\n(\s+)?/, '(')
        .replace(/,?\n\s+\)/, ')')
        .replace(/,\n(\s+)?{/, ', {')
        .replace(/},\n(\s+)?\)/, '})')
        .replace(/,\n(\s+)?/, ', ');
    
    return text.replace(paramsText, newText);
};

export const include = () => [
    'FunctionDeclaration',
    'FunctionExpression',
    'ArrowFunctionExpression',
];

export const filter = ({text}) => {
    const beforeCloseIndex = text.indexOf(')');
    const beforeCloseText = text.slice(0, beforeCloseIndex);
    
    return checkFunction(beforeCloseText);
};

function checkFunction(text) {
    const before = text.includes('(\n');
    const after = text.includes('\n)');
    
    return before || after;
}
