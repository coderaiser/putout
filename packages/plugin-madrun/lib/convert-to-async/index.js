import {types, operator} from 'putout';

const {replaceWith, superTraverse} = operator;

const {
    isStringLiteral,
    awaitExpression,
} = types;

export const report = () => 'Use async function';

export const exclude = () => [
    'await run(__args)',
    'await cutEnv(__args)',
    '() => run(__a)',
];

export const match = () => ({
    'run(__args)': check,
    'cutEnv(__args)': check,
});

export const replace = () => ({
    ...convert('run(__args)'),
    ...convert('cutEnv(__args)'),
});

const check = ({__args}, path) => {
    if (!path.parentPath.isFunction())
        return true;
    
    for (const arg of __args) {
        if (!isStringLiteral(arg))
            return true;
    }
    
    return false;
};

const convert = (pattern) => ({
    [pattern]: (vars, path) => {
        superTraverse(path, {
            [pattern](path) {
                replaceWith(path, awaitExpression(path.node));
                path.stop();
            },
        });
        
        path.scope.block.async = true;
        return `await ${pattern}`;
    },
});
