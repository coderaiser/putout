import {createDebug as mainCreateDebug} from 'obug';

export const createDebug = (namespace) => {
    const log = mainCreateDebug(namespace);
    
    return new Proxy(log, {
        apply(target, thisArg, args) {
            globalThis.__putout_debug?.(namespace, ...args);
            return target(...args);
        },
        get(target, prop) {
            if (globalThis.__putout_debug?.[prop])
                return true;
            
            return target[prop];
        },
    });
};
