import {template, types} from 'putout';

const {
    isUnaryExpression,
    isThrowStatement,
    isBlockStatement,
} = types;

const REJECTS = template('stub().rejects(A)');

export const report = () => `Use 'stub()' instead of creating a function`;

export const match = () => ({
    'async () => __a': ({__a}, path) => {
        if (!path.parentPath.isVariableDeclarator())
            return false;
        
        if (!isBlockStatement(__a))
            return true;
        
        if (!__a.body.length)
            return true;
        
        return isThrowStatement(__a.body[0]);
    },
});

export const replace = () => ({
    'async () => __a': ({__a}) => {
        if (isUnaryExpression(__a, {operator: 'throw'}))
            return REJECTS({
                A: __a.argument,
            });
        
        if (isBlockStatement(__a) && !__a.body.length)
            return 'stub().resolves()';
        
        if (isBlockStatement(__a) && isThrowStatement(__a.body[0]))
            return REJECTS({
                A: __a.body[0].argument,
            });
        
        return 'stub().resolves(__a)';
    },
});
