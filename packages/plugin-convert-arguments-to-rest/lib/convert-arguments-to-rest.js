'use strict';

const {
    spreadElement,
    identifier,
} = require('putout').types;

module.exports.report = () => 'rest parameters should be used instead of "arguments"';

module.exports.fix = ({path, fnPath}) => {
    fnPath.node.params = [
        spreadElement(identifier('args')),
    ];
    
    path.node.name = 'args';
};

module.exports.find = (ast, {push, traverse}) => {
    const traverseFn = traverseFunction(push);
    
    traverse(ast, {
        FunctionExpression: traverseFn,
        FunctionDeclaration: traverseFn,
    });
};

const traverseFunction = (push) => (fnPath) => {
    if (fnPath.node.params.length)
        return;
    
    fnPath.traverse({
        Identifier(path) {
            const {
                node,
                scope,
            } = path;
            
            if (node.name !== 'arguments')
                return;
            
            if (scope.hasBinding('args'))
                return;
            
            push({
                path,
                fnPath,
            });
        },
    });
};
