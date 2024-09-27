'use strict';

const {types} = require('putout');
const {
    Identifier,
    isFunction,
    SpreadElement,
} = types;

module.exports.report = () => `Use 'rest parameters' instead of 'arguments'`;

module.exports.fix = ({path, paths}) => {
    path.node.params = [
        SpreadElement(Identifier('args')),
    ];
    
    for (const path of paths) {
        path.node.name = 'args';
    }
};

module.exports.traverse = ({push}) => ({
    'FunctionExpression|FunctionDeclaration': (path) => {
        const {directives} = path.node.body;
        
        if (path.node.params.length)
            return;
        
        if (directives.length)
            return;
        
        const paths = [];
        const fnPath = path;
        
        path.traverse({
            Identifier(path) {
                const {node, scope} = path;
                const idFnPath = path.find(isFunction);
                
                if (idFnPath !== fnPath)
                    return;
                
                if (node.name !== 'arguments')
                    return;
                
                if (scope.hasBinding('args'))
                    return;
                
                paths.push(path);
            },
        });
        
        if (!paths.length)
            return;
        
        push({
            path,
            paths,
        });
    },
});
