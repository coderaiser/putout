'use strict';

const {isCorrectLoc} = require('../common');

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate lines when destructuring long properties';

module.exports.include = () => ['VariableDeclarator[id.type="ObjectPattern"][id.properties.length>=2]'];

module.exports.fix = ({text}) => {
    const end = text.indexOf('}') + 1;
    
    const startText = text
        .slice(0, end)
        .replace(/,/g, ',\n   ')
        .replace('{', '{\n    ')
        .replace('}', '\n}');
    
    const endText = text.slice(end);
    
    return `${startText}${endText}`;
};

module.exports.filter = ({node}) => {
    const {parent} = node.parent;
    
    if (parent.type === 'ForOfStatement')
        return false;
    
    const {id} = node;
    const {properties} = id;
    const {line} = node.loc.start;
    const isLoc = isCorrectLoc(line, properties);
    const isLength = isCorrectLength(properties);
    
    return !(isLoc || isLength);
};

function isCorrectLength(properties) {
    for (const prop of properties) {
        const {name} = prop.key || prop.argument;
        
        if (name.length >= 15)
            return false;
    }
    
    return true;
}
