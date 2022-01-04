'use strict';

const fixNewLines = (text) => {
    return text
        .replace(/\(\n\s+/, '(')
        .replace(/,?\n\s+\)/, ')');
};

module.exports.report = () => {
    return `Unexpected new lines around arguments`;
};

module.exports.fix = ({text}) => fixNewLines(text);

module.exports.include = () => [
    'FunctionDeclaration',
    'ArrowFunctionExpression',
];

module.exports.filter = ({text}) => {
    const beforeCloseIndex = text.indexOf(')');
    const beforeCloseText = text.slice(0, beforeCloseIndex);
    
    return checkFunction(beforeCloseText);
};

function checkFunction(text) {
    const before = text.includes('(\n');
    const after = text.includes('\n)');
    
    return before || after;
}

