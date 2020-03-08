'use strict';

module.exports.report = () => '"Array.from" has no sense inside for-of';

const {replaceWith} = require('putout').operator;

module.exports.fix = (path) => {
    const rightPath = path.get('right');
    replaceWith(rightPath, rightPath.node.arguments[0]);
};

module.exports.include = () => [
    'for (const __ of Array.from(__))__',
];
