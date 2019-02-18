'use strict';

const store = require('fullstore');

module.exports.report = () => '"use strict" is redundant is esm';

module.exports.fix = (path) => path.remove();

module.exports.find = (ast, {push, traverse}) => {
    const isModule = store();
    
    traverse(ast, {
        'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration'(path) {
            isModule(true);
            path.stop();
        },
        Program: {
            exit(path) {
                const strictPath = path.get('body.0');
                if (isModule() && strictPath.isExpressionStatement() && strictPath.node.expression.value === 'use strict')
                    push(strictPath);
                
                path.stop();
            },
        },
    });
};

