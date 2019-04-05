'use strict';

const store = require('fullstore');

module.exports.report = () => '"use strict" is redundant is esm';

module.exports.fix = (chunk) => chunk.remove();

module.exports.find = (ast, {push, traverse}) => {
    const isModule = store();
    
    traverse(ast, {
        'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration'(chunk) {
            isModule(true);
            chunk.stop();
        },
        Program: {
            exit(chunk) {
                const [strictPath] = chunk.body;
                
                if (isModule() && strictPath.isExpressionStatement() && strictPath.node.expression.value === 'use strict')
                    push(strictPath);
                
                chunk.stop();
            },
        },
    });
};

