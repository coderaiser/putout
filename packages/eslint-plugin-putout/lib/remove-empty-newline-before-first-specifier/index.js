'use strict';

module.exports.category = 'import';
module.exports.report = () => 'Remove newline before first specifier';

const regExp = /{\n(\s+)?\n/;

module.exports.filter = ({text}) => {
    return regExp.test(text);
};

module.exports.fix = ({text}) => {
    return text
        .replace(regExp, '{\n');
};

module.exports.include = () => [
    'ImportDeclaration',
    'ObjectExpression',
];

