import {types, operator} from 'putout';

const {compare} = operator;
const {
    isArrayExpression,
    isIdentifier,
    isObjectExpression,
} = types;

export const report = () => `Use 't.deepEqual()' when comparing Objects an Arrays`;

export const match = () => ({
    't.equal(__a, __b)': check,
    't.notEqual(__a, __b)': check,
});

export const replace = () => ({
    't.equal(__a, __b)': 't.deepEqual(__a, __b)',
    't.notEqual(__a, __b)': 't.notDeepEqual(__a, __b)',
});

function check({__a, __b}, path) {
    if (isObjectExpression(__b))
        return true;
    
    if (isArrayExpression(__b))
        return true;
    
    if (!isIdentifier(__b))
        return false;
    
    const __aDeclaration = path.scope.bindings[__a.name];
    
    if (__aDeclaration) {
        const {init} = __aDeclaration.path.node;
        
        if (compare(init, 'new Date(__args)'))
            return true;
    }
    
    const __bDeclaration = path.scope.bindings[__b.name];
    
    if (!__bDeclaration)
        return false;
    
    const {id, init} = __bDeclaration.path.node;
    
    if (compare(init, 'new Date(__args)'))
        return true;
    
    if (!isIdentifier(id, {name: 'expected'}))
        return false;
    
    if (compare(init, 'Buffer.from(__a)'))
        return true;
    
    return isObjectExpression(init) || isArrayExpression(init);
}
