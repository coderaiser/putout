'use strict';

const {
    isExpressionStatement,
    StringLiteral,
    ExpressionStatement,
    isProgram,
} = require('putout').types;

module.exports.report = () => `Add missing 'use strict' directive on top of CommonJS`;

module.exports.fix = ({node}) => {
    node.body.unshift(ExpressionStatement(StringLiteral('use strict')));
};

module.exports.traverse = ({push, store}) => ({
    'await __a(__args)'({scope}) {
        const {block} = scope;
        
        if (!isProgram(block))
            return;
        
        store('is-module', true);
    },
    'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|ExportAllDeclaration|TypeAlias'() {
        store('is-module', true);
    },
    'module.exports = __a'() {
        store('is-common', true);
    },
    'module.exports.__a = __b'() {
        store('is-common', true);
    },
    'require(__a)'() {
        store('is-common', true);
    },
    Program: {
        exit(path) {
            for (const node of path.node.body)
                if (isExpressionStatement(node) && node.expression.value === 'use strict')
                    return;
            
            if (store('is-module'))
                return;
            
            if (path.node.directives.length)
                return;
            
            if (!store('is-common'))
                return;
            
            push(path);
        },
    },
});
