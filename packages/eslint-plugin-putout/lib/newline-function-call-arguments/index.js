export const report = () => 'Add new line before and after arguments in a function call';

export const include = () => [
    'CallExpression',
];

export const filter = ({node, text}) => {
    if (node.callee.type !== 'Identifier')
        return false;
    
    if (text.includes(`'`))
        return false;
    
    const {name} = node.callee;
    
    if (node.arguments.length < 3)
        return false;
    
    for (const arg of node.arguments) {
        if (/Function|Object|Array/.test(arg.type))
            return false;
    }
    
    const textPeace = text.replace(name, '');
    
    if (textPeace.length < 60)
        return false;
    
    const isOpenBracket = textPeace.startsWith('(\n');
    const isCloseBracket = /\n\s*\)$/.test(textPeace);
    
    return !(isOpenBracket && isCloseBracket);
};

export const fix = ({text}) => {
    return text
        .replace('(', '(\n')
        .replace(/,\s?/g, ',\n')
        .replace(/\)$/, '\n)');
};
