'use strict';

const {
    isExpressionStatement,
    StringLiteral,
    ExpressionStatement,
    isProgram,
} = require('putout').types;

module.exports.report = () => '"use strict" directive should be on top of CommonJS file';

module.exports.fix = ({node}) => {
    node.body.unshift(ExpressionStatement(StringLiteral('use strict')));
};

module.exports.traverse = ({push, store}) => ({
    'await __a(__args)'({scope}) {
        const {block} = scope;
        
        if (isProgram(block))
            store('is-module', true);
    },
    'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|ExportAllDeclaration|TypeAlias'() {
        store('is-module', true);
    },
    Program: {
        exit(path) {
            const [first] = path.node.body;
            
            if (isExpressionStatement(first) && first.expression.value === 'use strict')
                return;
            
            if (store('is-module'))
                return;
            
            push(path);
        },
    },
});

