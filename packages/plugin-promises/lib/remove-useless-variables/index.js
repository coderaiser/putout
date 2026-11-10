import {operator} from 'putout';

const {
    remove,
    rename,
    compare,
    createTypeChecker,
} = operator;

const compareWith = (a) => (b) => compare(b, a);

const isPromiseResolve = createTypeChecker([
    ['-: parentPath -> !VariableDeclarator'],
    ['-: node.argument -> !CallExpression'],
    ['+: node.argument.callee', compareWith('Promise.resolve')],
]);

export const report = () => `'Promise.resolve()' has no sense in async function`;

export const fix = (path) => {
    const {node} = path;
    const [declaratorPath, declarationPath] = parseParent(path);
    
    const [oldArg] = node.arguments;
    const newArg = declarationPath.node.id;
    
    declaratorPath.node.argument = oldArg;
    rename(path, newArg.name, oldArg.name);
    remove(declarationPath);
};

export const traverse = ({push}) => ({
    AwaitExpression(path) {
        if (!isPromiseResolve(path))
            return;
        
        push(path.get('argument'));
    },
});

const parseParent = (path) => [
    path.parentPath,
    path.parentPath.parentPath,
];
