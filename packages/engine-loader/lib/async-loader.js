'use strict';

const tryToCatch = require('try-to-catch');
const {simpleImport} = require('./simple-import');

const {assign} = Object;
const stub = () => () => {};

module.exports.createAsyncLoader = (type) => async (name, load) => {
    if (name === 'none')
        return stub();
    
    const [e, reporter] = await cleverLoad([
        `@putout/${type}-${name}`,
        `putout-${type}-${name}`,
    ], load);
    
    if (e)
        throw e;
    
    return reporter;
};
async function cleverLoad(names, load = simpleImport) {
    let e;
    let reporter;
    
    for (const name of names) {
        [e, reporter] = await tryToCatch(load, name);
        
        if (!e)
            return [null, reporter];
        
        if (e.code === 'ERR_MODULE_NOT_FOUND')
            continue;
        
        assign(e, {
            message: `${name}: ${e.message}`,
        });
        
        return [e];
    }
    
    assign(e, {
        message: e.message.replace(/\simported.*/, ''),
    });
    
    return [e];
}

