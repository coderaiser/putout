'use strict';

module.exports.category = 'import';
module.exports.report = () => 'Keep opening curly brace on one line with default import';

const regExp = /,\n\s*{/;

module.exports.filter = ({text}) => {
    return regExp.test(text);
};

module.exports.fix = ({text}) => {
    return text.replace(regExp, ', {');
};

module.exports.include = () => [
    'ImportDeclaration',
];
