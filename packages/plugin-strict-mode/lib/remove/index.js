'use strict';

const store = require('fullstore');

module.exports.report = () => '"use strict" is redundant is esm';

module.exports.fix = (path) => path.remove();

module.exports.traverse = ({push}) => {
    const isModule = store();
    
    return {
        'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration'() {
            isModule(true);
        },
        Program: {
            exit(path) {
                const strictPath = path.get('body.0');
                
                if (isModule() && strictPath.isExpressionStatement() && strictPath.node.expression.value === 'use strict')
                    push(strictPath);
                
                path.stop();
            },
        },
    };
};

