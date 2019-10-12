'use strict';

const {
    isExpressionStatement,
    StringLiteral,
    ExpressionStatement,
} = require('putout').types;

const store = require('fullstore');

module.exports.report = () => '"use strict" directive should be on top of commonjs file';

module.exports.fix = ({node}) => {
    node.body.unshift(ExpressionStatement(StringLiteral('use strict')));
};

module.exports.traverse = ({push}) => {
    const isModule = store();
    let added = false;
    
    return {
        'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|TypeAlias'() {
            isModule(true);
        },
        Program: {
            exit(path) {
                const [first] = path.node.body;
                
                if (added)
                    return;
                
                added = true;
                
                if (isExpressionStatement(first) && first.expression.value === 'use strict')
                    return;
                
                if (isModule())
                    return;
                
                push(path);
            },
        },
    };
};

