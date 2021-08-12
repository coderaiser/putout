'use strict';

const regexpTree = require('regexp-tree');

const notChar = (a) => a.type !== 'Char';

module.exports = (regexp) => {
    let containsMoreThenChars = false;
    const ast = regexpTree.parse(regexp);
    
    if (ast.body.type !== 'Alternative')
        return false;
    
    regexpTree.traverse(ast, {
        RegExp({node}) {
            const {expressions} = node.body;
            containsMoreThenChars = Boolean(expressions.find(notChar));
        },
    });
    
    return !containsMoreThenChars;
};

