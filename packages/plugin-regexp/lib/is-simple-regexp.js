'use strict';

const regexpTree = require('regexp-tree');

const notSimpleChar = ({type, kind}) => type !== 'Char' || kind !== 'simple';

module.exports = (regexp) => {
    let containsMoreThenSimpleChars = false;
    const ast = regexpTree.parse(regexp);
    
    if (ast.body.type !== 'Alternative')
        return false;
    
    regexpTree.traverse(ast, {
        RegExp({node}) {
            const {expressions} = node.body;
            containsMoreThenSimpleChars = Boolean(expressions.find(notSimpleChar));
        },
    });
    
    return !containsMoreThenSimpleChars;
};

