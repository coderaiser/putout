import {types} from 'putout';

const {
    identifier,
    isFunction,
    spreadElement,
} = types;

export const report = () => `Use 'rest parameters' instead of 'arguments'`;

export const fix = ({path, paths}) => {
    path.node.params = [
        spreadElement(identifier('args')),
    ];
    
    for (const path of paths) {
        path.node.name = 'args';
    }
};

export const traverse = ({push}) => ({
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
