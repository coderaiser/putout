export const category = 'object';
export const report = () => 'Remove empty import specifiers';

export const filter = ({text, node, getCommentsInside}) => {
    const comments = getCommentsInside(node);
    
    if (comments.length)
        return false;
    
    return text.includes('{}');
};

export const fix = ({text}) => {
    return text
        .replace('import {} from', 'import')
        .replace(/,? {}/, '');
};

export const include = () => [
    'ImportDeclaration',
];
