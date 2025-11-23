'use strict';

const {createDebug} = require('obug');

module.exports.createDebug = (namespace) => {
    const log = createDebug(namespace);
    
    return new Proxy(log, {
        apply(target, thisArg, args) {
            global.__putout_debug?.(namespace, ...args);
            return target(...args);
        },
        get(target, prop) {
            if (global.__putout_debug?.[prop])
                return true;
            
            return target[prop];
        },
    });
};
