'use strict';

module.exports.report = () => '"use strict" is redundant is esm';

module.exports.fix = (path) => path.remove();

module.exports.traverse = ({push, store}) => {
    return {
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
                
                path.stop();
            },
        },
    };
};

