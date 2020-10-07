'use strict';

const {
    isExpressionStatement,
    StringLiteral,
    ExpressionStatement,
} = require('putout').types;

module.exports.report = () => '"use strict" directive should be on top of commonjs file';

module.exports.fix = ({node}) => {
    node.body.unshift(ExpressionStatement(StringLiteral('use strict')));
};

module.exports.traverse = ({push, store}) => {
    let added = false;
    
    return {
        'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|ExportAllDeclaration|TypeAlias'() {
            store('is-module', true);
        },
        Program: {
            exit(path) {
                const [first] = path.node.body;
                
                if (added)
                    return;
                
                added = true;
                
                if (isExpressionStatement(first) && first.expression.value === 'use strict')
                    return;
                
                if (store('is-module'))
                    return;
                
                push(path);
            },
        },
    };
};

