'use strict';

module.exports.category = 'array';
module.exports.report = () => 'Remove newline after last element';

const regExp = /\n\n(\s+)?]/;

module.exports.filter = ({text}) => {
    return regExp.test(text);
};

module.exports.fix = ({text}) => {
    return text
        .replace(regExp, '\n]');
};

module.exports.include = () => [
    'ArrayExpression',
];

