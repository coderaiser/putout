'use strict';

const {template, operator} = require('putout');

module.exports.report = () => `Use Logical Expression instead of Optional Chaining`;

const {replaceWith} = operator;

module.exports.fix = (path) => {
    const logical = getLogical(path);
    replaceWith(path, template.ast(logical));
};

module.exports.include = () => [
    'OptionalMemberExpression',
    'OptionalCallExpression',
];

module.exports.filter = ({parentPath}) => {
    if (parentPath.isOptionalMemberExpression())
        return false;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    return !parentPath.isOptionalCallExpression();
};

function getLogical(path) {
    const list = path
        .toString()
        .split('?.');
    
    const n = list.length;
    let [member] = list;
    let i = 0;
    
    const logical = [member];
    
    while (++i < n) {
        member += compute(member, list[i]);
        logical.push(member);
    }
    
    return logical.join(' && ');
}

function compute(member, current) {
    const [first] = current;
    
    if (first === '(' || first === '[')
        return current;
    
    return `.${current}`;
}
