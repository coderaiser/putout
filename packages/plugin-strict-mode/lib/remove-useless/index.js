'use strict';

const {
    operator,
    types,
} = require('putout');

const {remove} = operator;
const {isProgram} = types;

module.exports.report = () => `Avoid 'use strict' in ESM`;

module.exports.fix = (path) => remove(path);

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
            const [strictPath, ...paths] = path.get('body');
            
            for (const path of paths) {
                if (path.isExpressionStatement() && path.node.expression.value === 'use strict') {
                    push(path);
                }
            }
            
            if (!store('is-module'))
                return;
            
            if (strictPath.isExpressionStatement() && strictPath.node.expression.value === 'use strict')
                push(strictPath);
        },
    },
});

