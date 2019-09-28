'use strict';

const {replaceWith} = require('putout').operate;

module.exports.report = () => `Useless spread should be avoided`;

module.exports.fix = (path) => {
    const rightPath = path.get('right');
    const [spread] = rightPath.node.elements;
    replaceWith(rightPath, spread.argument);
};

module.exports.include = () => [
    'for (const __ of [...__]) __',
];

