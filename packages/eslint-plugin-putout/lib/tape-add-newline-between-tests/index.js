'use strict';

module.exports.category = 'tape';
module.exports.report = () => 'Add new line between tests';

module.exports.filter = ({text, node, getText, getCommentsBefore}) => {
    if (!/^test(\.only|\.skip)?\(/.test(text))
        return false;
    
    const comments = getCommentsBefore(node);
    
    if (comments.length)
        return false;
    
    const [a] = getText(node, 2);
    
    return a === ';';
};

module.exports.fix = ({text}) => {
    return `\n${text}`;
};

module.exports.include = () => [
    'CallExpression ',
];

