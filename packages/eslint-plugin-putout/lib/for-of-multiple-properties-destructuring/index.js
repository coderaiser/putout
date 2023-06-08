'use strict';

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep all properties in one line when using destructuring in for-of';

module.exports.include = ({options}) => {
    const {maxProperties = 8} = options[0] || {};
    
    return [
        `VariableDeclarator[id.type="ObjectPattern"][id.properties.length<${maxProperties}]`,
    ];
};

module.exports.filter = ({node, text}) => {
    if (node.parent.parent.type !== 'ForOfStatement')
        return false;
    
    if (!text.includes('\n'))
        return false;
    
    return true;
};

module.exports.fix = ({text}) => {
    return text
        .replace(/\n/g, '')
        .replace(/,/g, ', ')
        .replace(/{\s*/g, '{')
        .replace(/\s*}/g, '}');
};
