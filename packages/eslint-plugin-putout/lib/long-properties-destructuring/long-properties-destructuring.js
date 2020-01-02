'use strict';

const {isCorrectLoc} = require('../common');

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate lines when destructuring long properties';

module.exports.include = () => [
    'VariableDeclarator[id.type="ObjectPattern"][id.properties.length>=2]',
];

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace('{', '{\n')
        .replace('}', '\n}');
};

module.exports.filter = ({node}) => {
    const {id} = node;
    const {properties} = id;
    const {line} = node.loc.start;
    const isLoc = isCorrectLoc(line, properties);
    const isLength = isCorrectLength(properties);
    
    if (isLoc || isLength)
        return false;
    
    return true;
};

function isCorrectLength(properties) {
    for (const prop of properties) {
        const {name} = prop.key || prop.argument;
        
        if (name.length >= 10)
            return false;
    }
    
    return true;
}

