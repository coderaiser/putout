'use strict';

const {operate, template} = require('putout');
const {replaceWith} = operate;

const buildArrayFrom = template(`
  Array.from(%%argument%%);
`);

module.exports.report = () => `Array.from should be used instead of array spread`;

module.exports.fix = (path) => {
    const [element] = path.node.elements;
    const {argument} = element;
    
    const ast = buildArrayFrom({
        argument,
    });
    
    replaceWith(path, ast);
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

