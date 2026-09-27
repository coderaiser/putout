import {operator} from 'putout';

const {getBinding} = operator;

export const report = () => `Destructure duplicate call`;

export const match = () => ({
    'const __a = __b().__c && __b().__c.__d': ({__c}, path) => !getBinding(path, __c.name),
});

export const replace = () => ({
    '(__a) => __a().__b && __a().__b.__c()': `(__a) => {
        const {__b} = __a();
        return __b && __b.__c();
    }`,
    'const __a = __b().__c && __b().__c.__d': `{
        const {__c} = __b();
        const __a = __c && __c.__d;
    }`,
});
