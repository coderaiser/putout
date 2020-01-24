'use strict';

const {
    spreadElement,
    identifier,
} = require('putout').types;

module.exports.report = () => 'rest parameters should be used instead of "arguments"';

module.exports.fix = ({path, paths}) => {
    path.node.params = [
        spreadElement(identifier('args')),
    ];
    
    for (const path of paths) {
        path.node.name = 'args';
    }
};

module.exports.traverse = ({push}) => {
    return {
        'FunctionExpression|FunctionDeclaration': (path) => {
            if (path.node.params.length)
                return;
            
            const paths = [];
            
            path.traverse({
                Identifier(path) {
                    const {
                        node,
                        scope,
                    } = path;
                    
                    if (node.name !== 'arguments')
                        return;
                    
                    if (scope.hasBinding('args'))
                        return;
                    
                    paths.push(path);
                },
            });
            
            if (!paths.length)
                return;
            
            push({path, paths});
        },
    };
};

