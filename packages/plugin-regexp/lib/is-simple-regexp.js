'use strict';

const regexpTree = require('regexp-tree');

const notChar = (a) => a.type !== 'Char';

module.exports = (regexp) => {
    let containsMoreThenChars = false;
    
    const ast = regexpTree.parse(regexp);
    regexpTree.traverse(ast, {
        RegExp({node}) {
            const {expressions} = node.body;
            
            if (!expressions) {
                containsMoreThenChars = true;
                return;
            }
            
            containsMoreThenChars = Boolean(expressions.find(notChar));
        },
    });
    
    return !containsMoreThenChars;
};

