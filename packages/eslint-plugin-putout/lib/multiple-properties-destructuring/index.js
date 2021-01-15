'use strict';

const {isCorrectLoc} = require('../common');

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate lines when using multiple destructuring properties';

module.exports.include = ({options}) => {
    const {minProperties = 2} = options[0] || {};
    
    return [
        `VariableDeclarator[id.type="ObjectPattern"][id.properties.length>${minProperties}]`,
    ];
};

module.exports.filter = ({node}) => {
    if (node.parent.parent.type === 'ForOfStatement')
        return false;
    
    const {id} = node;
    const {properties} = id;
    const {line} = node.loc.start;
    const isLoc = isCorrectLoc(line, properties);
    
    if (isLoc)
        return false;
    
    return true;
};

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace('{', '{\n')
        .replace('}', '\n}')
        .replace(/\n\s*?\n/g, '\n');
};

