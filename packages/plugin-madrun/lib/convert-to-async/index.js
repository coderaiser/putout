import {types, operator} from 'putout';

const {replaceWith, traverse} = operator;

const {
    isStringLiteral,
    awaitExpression,
} = types;

export const report = () => 'Use async function';

export const exclude = () => [
    'await run(__args)',
    '() => run(__a)',
];

export const match = () => ({
    'run(__args)': ({__args}, path) => {
        if (!path.parentPath.isFunction())
            return true;
        
        for (const arg of __args) {
            if (!isStringLiteral(arg))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    'run(__args)': (vars, path) => {
        traverse(path, {
            'run(__args)'(path) {
                replaceWith(path, awaitExpression(path.node));
                path.stop();
            },
        });
        
        path.scope.block.async = true;
        return 'await run(__args)';
    },
});
