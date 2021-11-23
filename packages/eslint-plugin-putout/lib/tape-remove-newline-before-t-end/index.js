'use strict';

module.exports.category = 'tape';
module.exports.report = () => 'Remove newline before t.end()';

const newlineReg = /\n +\n +t.end\(\)/;

module.exports.filter = ({text}) => {
    if (!/^test(\.only|\.skip)?\(/.test(text))
        return false;
    
    if (newlineReg.test(text))
        return true;
    
    return false;
};

module.exports.fix = ({text}) => {
    return text.replace(newlineReg, '\n    t.end()');
};

module.exports.include = () => [
    'CallExpression',
];

