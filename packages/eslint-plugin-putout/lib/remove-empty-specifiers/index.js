'use strict';

module.exports.category = 'object';
module.exports.report = () => 'Remove empty import specifiers';

module.exports.filter = ({text, node, getCommentsInside}) => {
    const comments = getCommentsInside(node);
    
    if (comments.length)
        return false;
    
    return text.includes('{}');
};

module.exports.fix = ({text}) => {
    return text
        .replace('import {} from', 'import')
        .replace(/,? {}/, '');
};

module.exports.include = () => [
    'ImportDeclaration',
];

