'use strict';

const getValue = ({source}) => source?.value;

module.exports.category = 'errors';
module.exports.report = () => 'Avoid duplicate extensions in relative imports';
module.exports.include = () => [
    'ImportDeclaration',
    'ImportExpression',
    'ExportAllDeclaration',
    'ExportNamedDeclaration',
];

module.exports.fix = ({text}) => {
    return text.replace('.js.js', '.js');
};

module.exports.filter = ({node}) => {
    const value = getValue(node);
    return /\.js\.js/.test(value);
};
