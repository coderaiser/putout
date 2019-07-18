'use strict';

const {
    isExpressionStatement,
    Directive,
    DirectiveLiteral,
} = require('putout').types;

const store = require('fullstore');

module.exports.report = () => '"use strict" directive should be on top of commonjs file';

module.exports.fix = ({node}) => {
    node.directives.unshift(Directive(DirectiveLiteral('use strict')));
};

module.exports.traverse = ({push}) => {
    const isModule = store();
    
    return {
        'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration'() {
            isModule(true);
        },
        Program: {
            exit(path) {
                const {node} = path;
                const {directives} = node;
                
                const [first] = node.body;
                
                if (isExpressionStatement(first) && first.expression.value === 'use strict')
                    return;
                
                if (!isModule() && (!directives || !directives.length))
                    push(path);
                
                path.stop();
            },
        },
    };
};

