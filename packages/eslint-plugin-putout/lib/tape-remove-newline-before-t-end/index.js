'use strict';

const {
    operator,
    types,
} = require('putout');

const {
    isCallExpression,
    isIdentifier,
} = types;

const {compare} = operator;

module.exports.category = 'tape';
module.exports.report = () => 'Remove newline before t.end()';

const newlineReg = /\n( +)?\n +t.end\(\)/;

module.exports.filter = ({text, node}) => {
    if (!/^test(\.only|\.skip)?\(/.test(text))
        return false;
    
    if (!newlineReg.test(text))
        return false;
    
    const {body} = node.arguments[1].body;
    const n = body.length;
    
    for (let i = 1; i < n; i++) {
        const current = body[i];
        const prev = body[i - 1];
        
        if (!compare(current, 't.end()'))
            continue;
        
        if (!isCallExpression(prev.expression))
            break;
        
        const {callee} = prev.expression;
        return isIdentifier(callee.object, {name: 't'});
    }
    
    return false;
};

module.exports.fix = ({text}) => {
    return text.replace(newlineReg, '\n    t.end()');
};

module.exports.include = () => [
    'CallExpression',
];

