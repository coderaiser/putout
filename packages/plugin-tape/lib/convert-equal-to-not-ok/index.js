import {operator, types} from 'putout';

const isNumber = (a) => typeof a === 'number';
const isString = (a) => typeof a === 'string';
const {compute} = operator;

const {
    isNullLiteral,
    isIdentifier,
    isBooleanLiteral,
    isNumericLiteral,
} = types;

export const report = (path) => {
    const arg = path.get('arguments.0');
    return `Use 't.notOk(${arg})' instead of '${path}'`;
};

export const match = () => ({
    't.equal(__a, __b)': ({__b}, path) => {
        if (isBooleanLiteral(__b, {value: false}))
            return true;
        
        if (isIdentifier(__b, {name: 'undefined'}))
            return true;
        
        if (isNullLiteral(__b))
            return true;
        
        if (isNumericLiteral(__b))
            return false;
        
        const [is, value] = compute(path.get('arguments.1'));
        
        if (!is)
            return false;
        
        if (isString(value))
            return false;
        
        if (isNumber(value))
            return false;
        
        return !value;
    },
});

export const replace = () => ({
    't.equal(__a, __b)': 't.notOk(__a)',
    't.equal(__a, null, __b)': 't.notOk(__a, __b)',
    't.equal(__a, false, __b)': 't.notOk(__a, __b)',
    't.equal(__a, undefined, __b)': 't.notOk(__a, __b)',
    't.deepEqual(__a, null)': 't.notOk(__a)',
    't.deepEqual(__a, null, __b)': 't.notOk(__a, __b)',
    't.deepEqual(__a, undefined)': 't.notOk(__a)',
    't.deepEqual(__a, undefined, __b)': 't.notOk(__a, __b)',
    't.deepEqual(__a, false)': 't.notOk(__a)',
    't.deepEqual(__a, false, __b)': 't.notOk(__a, __b)',
    't.equal(__a)': 't.notOk(__a)',
    't.notEqual(__a)': 't.ok(__a)',
});
