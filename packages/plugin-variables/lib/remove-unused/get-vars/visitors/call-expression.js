import {types} from 'putout';

const {isIdentifier} = types;

export const createCallExpression = (name, {use}) => ({
    [name]: (path) => {
        const {node} = path;
        const {callee} = node;
        
        if (isIdentifier(callee))
            use(path, node.callee.name);
        
        path.traverse({
            SpreadElement(path) {
                const {argument} = path.node;
                
                if (isIdentifier(argument))
                    use(path, argument.name);
            },
            Identifier(path) {
                if (node.arguments.includes(path.node))
                    use(path, path.node.name);
            },
        });
    },
});
