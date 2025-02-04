'use strict';

const process = require('node:process');
const {join} = require('node:path');
const once = require('once');
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
        
        return await cleverLoad([
            require.resolve(shortName),
        ], load);
    }
    
    const namesBase = [
        `@putout/${type}-${name}`,
        `putout-${type}-${name}`,
    ];
    
    const namesFromPluginsDirs = namesBase.flatMap(buildPluginsDirs);
    
    const names = Array.from(new Set([
        ...namesBase,
        ...namesFromPluginsDirs,
    ]));
    
    return await cleverLoad(names, load);
});

async function cleverLoad(names, load = simpleImport) {
    let e;
    let reporter;
    
    for (const name of names) {
        [e, reporter] = await tryToCatch(load, name);
        
        if (!e)
            return reporter;
        
        if (e.code === 'ERR_UNSUPPORTED_DIR_IMPORT') {
            const fullName = require.resolve(name);
            
            [e, reporter] = await tryToCatch(load, fullName);
            
            if (!e)
                return reporter;
        }
        
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

const getPutoutLoadDir = once(() => process.env.PUTOUT_LOAD_DIR);

function buildPluginsDirs(name) {
    const dir = getPutoutLoadDir();
    
    if (!dir)
        return [name];
    
    const base = join(dir, name);
    
    return [
        base,
        `${base}.js`,
    ];
}
