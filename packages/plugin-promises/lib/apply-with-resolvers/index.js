'use strict';

const {operator} = require('putout');
const {remove, getBindingPath} = operator;

const PROMISE = `
    const __p = new Promise((__a, __b) => {
      __c = __a;
      __d = __b;
    });
`;

module.exports.report = () => `Apply 'Promise.withResolvers()'`;

module.exports.match = () => ({
    [PROMISE]: ({__c, __d}, path) => {
        if (!getBindingPath(path, __c.name))
            return false;
        
        return getBindingPath(path, __d.name);
    },
});

module.exports.replace = () => ({
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
