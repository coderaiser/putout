import {operator} from 'putout';

const {createTypeChecker} = operator;

const isNotMarked = createTypeChecker([
    '-: node.async -> +',
    '-: __putout_promises_add_missing_async -> +',
    '+: -> +',
]);

export const report = () => `Add missing 'async'`;

export const fix = (path) => {
    path.node.async = true;
};

export const traverse = ({push}) => ({
    'await using __ = __': check(push),
    'AwaitExpression': check(push),
});

export const check = (push) => (path) => {
    const fnPath = path.getFunctionParent();
    
    if (!fnPath)
        return;
    
    if (!isNotMarked(fnPath))
        return;
    
    fnPath.__putout_promises_add_missing_async = true;
    
    push(fnPath);
};
