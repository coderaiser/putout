import {types, operator} from 'putout';

const {
    isArrayExpression,
    isObjectExpression,
    variableDeclarator,
    variableDeclaration,
    identifier,
} = types;

const {insertBefore} = operator;

export const report = () => `Extract 'args' from 't.calledWith()'`;

export const fix = (path) => {
    const id = identifier('args');
    const init = path.node.arguments.pop();
    
    path.node.arguments.push(id);
    
    insertBefore(path.parentPath, variableDeclaration('const', [
        variableDeclarator(id, init),
    ]));
};

export const traverse = ({push}) => ({
    't.calledWith(__a, __b)': (path) => {
        if (path.scope.bindings.args)
            return;
        
        const [, args] = path.node.arguments;
        
        if (!isArrayExpression(args))
            return;
        
        for (const element of args.elements) {
            if (isObjectExpression(element)) {
                push(path);
                return;
            }
            
            if (isArrayExpression(element)) {
                push(path);
                return;
            }
        }
    },
});
