'use strict';

const {replaceWith} = require('putout').operate;

module.exports.report = () => `Useless spread should be avoided`;

module.exports.fix = (path) => {
    const [element] = path.node.elements;
    replaceWith(path, element.argument);
};

module.exports.include = () => [
    '[...__]',
];

module.exports.filter = (path) => {
    const {elements} = path.node;
    
    if (elements.length === 1)
        return true;
    
    return false;
};

