import {types} from 'putout';

const {isUnaryExpression} = types;

export const report = () => `Avoid useless '!'`;

export const match = () => ({
    '!(__a || __b)': (vars, path) => !isUnaryExpression(path.parentPath),
});

export const replace = () => ({
    '!(__a > __b)': '__a <= __b',
    '!(__a !== __b && __c === __d)': '__a === __b || __c !== __d',
    '!(__a !== __b || __c !== __d)': '__a === __b && __c === __d',
    '!(__a || __b || __c || __d)': '!__a && !__b && !__c && !__d',
    '!(__a || __b || __c)': '!__a && !__b && !__c',
    '!(__a || __b)': '!__a && !__b',
    '!(__a <= __b)': '__a > __b',
});
