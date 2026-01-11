const regExp = /^\n( +)?\n +$/;

export const report = () => `Add newline before 'return'`;

export const filter = ({text, node, getCommentsBefore, getSpacesBeforeNode}) => {
    if (getCommentsBefore(node).length)
        return false;
    
    const {parent} = node;
    const {body} = parent;
    
    if (!body)
        return false;
    
    const n = body.length;
    
    if (body[0] === node)
        return false;
    
    if (n < 3)
        return false;
    
    const spaces = getSpacesBeforeNode(node, text);
    
    if (regExp.test(spaces))
        return false;
    
    let i = n - 1;
    let count = 0;
    
    while (--i) {
        const prevA = body[i];
        const spaces = getSpacesBeforeNode(prevA);
        
        if (regExp.test(spaces))
            break;
        
        ++count;
    }
    
    return !(count < 1);
};

export const fix = ({text}) => {
    return `\n${text}`;
};

export const include = () => [
    'ReturnStatement',
];
