'use strict';

const regExp = /^\n( +)?\n +$/;

module.exports.report = () => `Add newline before 'return'`;

module.exports.filter = ({text, node, getCommentsBefore, getSpacesBeforeNode}) => {
    if (getCommentsBefore(node).length)
        return false;
    
    const {parent} = node;
    const {body} = parent;
    
    if (!body)
        return false;
    
    const n = body.length;
    
    if (n < 3)
        return false;
    
    const spaces = getSpacesBeforeNode(node, text);
    
    if (regExp.test(spaces))
        return false;
    
    let i = n - 1;
    let count = 0;
    
    while(--i) {
        const prevA = body[i];
        const spaces = getSpacesBeforeNode(prevA);
        
        if (regExp.test(spaces))
            break;
        
        ++count;
    }
    
    if (count < 1)
        return false;
    
    return true;
};

module.exports.fix = ({text}) => {
    return `\n${text}`;
};

module.exports.include = () => [
    'ReturnStatement',
];
