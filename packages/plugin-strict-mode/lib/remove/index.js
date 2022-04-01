'use strict';

const {isProgram} = require('putout').types;

module.exports.report = () => '"use strict" is redundant in ESM';

module.exports.fix = (path) => path.remove();

module.exports.traverse = ({push, store}) => ({
    'await __a(__args)'({scope}) {
        const {block} = scope;
        
        if (isProgram(block))
            store('is-module', true);
    },
    'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|ExportAllDeclaration'() {
        store('is-module', true);
    },
    Program: {
        exit(path) {
            const strictPath = path.get('body.0');
            
            if (!store('is-module'))
                return;
            
            if (strictPath.isExpressionStatement() && strictPath.node.expression.value === 'use strict')
                push(strictPath);
        },
    },
});

