'use strict';

const {isObjectExpression} = require('putout').types;
const {isCorrectLoc} = require('../common');

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each element on separate lines';

module.exports.include = () => ['ArrayExpression'];

module.exports.filter = ({node}) => {
    const {elements} = node;
    const {line} = node.loc.start;
    
    if (elements.length < 3)
        return false;
    
    const [first] = elements;
    
    if (isObjectExpression(first))
        return false;
    
    return !isCorrectLoc(line, elements);
};

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace('[', '[\n')
        .replace(']', '\n]')
        .replace(/\n\s*?\n/g, '\n');
};

