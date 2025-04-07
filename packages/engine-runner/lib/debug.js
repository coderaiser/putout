'use strict';

const debug = require('debug');

module.exports.createDebug = (namespace) => {
    const log = debug(namespace);
    
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
