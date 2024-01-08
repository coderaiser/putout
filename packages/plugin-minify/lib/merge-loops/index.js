import {
    operator,
    template,
} from 'putout';

const {
    remove,
    getTemplateValues,
    compare,
} = operator;

const FOR = 'for (const __a of __b)__c(__e)';

const createLoop = template(`for (const  __a of [...__b, ...__z])__c(__e)`, {
    placeholderPattern: /^__[a-z]$/,
});

export const report = () => `Merge loops`;

export const replace = () => ({
    '__a.forEach((__b) => __e(__b)),__c.forEach((__d) => __e(__d))': 'for (const  __b of [...__a, ...__c])__e(__b)',
    [FOR]: ({__a, __b, __c, __e}, path) => {
        const next = path.getNextSibling();
        
        if (compare(next, FOR)) {
            const {__b: __z} = getTemplateValues(next, FOR);
            
            remove(next);
            
            return createLoop({
                __a,
                __b,
                __c,
                __e,
                __z,
            });
        }
        
        return path;
    },
});
