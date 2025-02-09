'use strict';

module.exports.report = (path) => {
    if (path.isOptionalMemberExpression())
        return `Use 'hasParens(path)' instead of 'path.node.extra'`;
    
    const rightPath = path.get('right');
    const {value} = rightPath.node;
    const methodName = value ? 'add' : 'remove';
    
    return `Use '${methodName}Parens(path)' instead of 'path.node.extra'`;
};

const ASSIGN_OBJECT = `
    __a.node.extra = {
        parenthesized: true,
    }
`;

module.exports.replace = () => ({
    '__a.node.extra.parenthesized = false': 'removeParens(__a)',
    '__a.node.extra.parenthesized = true': 'addParens(__a)',
    '__a.node.extra?.parenthesized': 'hasParens(__a)',
    [ASSIGN_OBJECT]: 'addParens(__a)',
});
