import {operator} from 'putout';

const {remove, getBindingPath} = operator;

const PROMISE = `
    const __p = new Promise((__a, __b) => {
      __c = __a;
      __d = __b;
    });
`;

export const report = () => `Apply 'Promise.withResolvers()'`;

export const match = () => ({
    [PROMISE]: ({__c, __d}, path) => {
        if (!getBindingPath(path, __c.name))
            return false;
        
        return getBindingPath(path, __d.name);
    },
});

export const replace = () => ({
    [PROMISE]: ({__c, __d, __p, __a, __b}, path) => {
        remove(getBindingPath(path, __c.name));
        remove(getBindingPath(path, __d.name));
        
        return `
            const {
                promise: ${__p.name},
                resolve: ${__a.name},
                reject: ${__b.name}
            } = Promise.withResolvers();
        `;
    },
});
