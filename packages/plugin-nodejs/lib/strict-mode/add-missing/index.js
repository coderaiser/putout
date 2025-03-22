import {types} from 'putout';

const {
    isExpressionStatement,
    stringLiteral,
    expressionStatement,
} = types;

export const report = () => `Add missing 'use strict' directive on top of CommonJS`;

export const fix = ({node}) => {
    node.body.unshift(expressionStatement(stringLiteral('use strict')));
};

export const traverse = ({push, store}) => ({
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
