'use strict';

const {nanomemoize} = require('nano-memoize');
const tryToCatch = require('try-to-catch');
const {simpleImport} = require('./simple-import');

const {assign} = Object;
const stub = () => () => {};

module.exports.createAsyncLoader = (type) => nanomemoize(async (name, load) => {
    if (name === 'none')
        return stub();
    
    if (name.startsWith('import:')) {
        const shortName = name.replace('import:', '');
        
        return await cleverLoad([require.resolve(shortName)], load);
    }
    
    return await cleverLoad([`@putout/${type}-${name}`, `putout-${type}-${name}`], load);
});

async function cleverLoad(names, load = simpleImport) {
    let e;
    let reporter;
    
    for (const name of names) {
        [e, reporter] = await tryToCatch(load, name);
        
        if (!e)
            return reporter;
        
        if (e.code === 'ERR_MODULE_NOT_FOUND')
            continue;
        
        assign(e, {
            message: `${name}: ${e.message}`,
        });
        
        throw e;
    }
    
    assign(e, {
        message: e.message.replace(/\simported.*/, ''),
    });
    
    throw e;
}
