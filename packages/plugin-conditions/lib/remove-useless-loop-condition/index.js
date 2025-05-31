import {operator} from 'putout';

const {
    getTemplateValues,
    compare,
} = operator;

const LOOP = 'while (__c = __d) __body';

export const report = () => `Avoid useless loop condition`;

export const match = () => ({
    'if (!__a) __b': ({__a}, path) => {
        const {parentPath} = path.parentPath;
        
        if (!compare(parentPath, LOOP))
            return false;
        
        const {__c} = getTemplateValues(parentPath, LOOP);
        
        return compare(__a, __c);
    },
});

export const replace = () => ({
    'if (!__a) __b': '',
});
