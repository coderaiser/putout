'use strict';

const {isCorrectLoc} = require('../common');

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate line';

module.exports.include = () => {
    return [
        `VariableDeclarator[init.type="ObjectExpression"]`,
    ];
};

module.exports.filter = ({node}) => {
    const {
        init,
        loc,
    } = node;
    
    const {properties} = init;
    const {line} = loc.start;
    
    return !isCorrectLoc(line, properties);
};

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace(/{/g, '{\n')
        .replace(/}/g, '\n}');
};

