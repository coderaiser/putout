export const category = 'tape';
export const report = () => 'Add newline between tests';

export const filter = ({text, node, getText, getCommentsBefore}) => {
    if (!/^test(\.only|\.skip)?\(/.test(text))
        return false;
    
    const comments = getCommentsBefore(node);
    
    if (comments.length)
        return false;
    
    const [a] = getText(node, 2);
    
    return a === ';';
};

export const fix = ({text}) => {
    return `\n${text}`;
};

export const include = () => [
    'CallExpression ',
];
