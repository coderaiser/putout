import process from 'node:process';
import {join} from 'node:path';
import tryToCatch from 'try-to-catch';
import {createRequire} from '../module.js';
import {simpleImport as _simpleImport} from './simple-import.js';

const require = createRequire(import.meta.url);

const {assign} = Object;
const stub = () => () => {};

export const createAsyncLoader = (type, overrides = {}) => {
    const {
        simpleImport = _simpleImport,
    } = overrides;
    
    return async (name) => {
        if (name === 'none')
            return stub();
        
        if (name.startsWith('import:')) {
            const shortName = name.replace('import:', '');
            
            return await cleverLoad([require.resolve(shortName)], {
                simpleImport,
                require,
            });
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
        
        return await cleverLoad(names, {
            simpleImport,
            require,
        });
    };
};

async function cleverLoad(names, overrides) {
    const {simpleImport, require} = overrides;
    
    let e;
    let reporter;
    
    for (const name of names) {
        [e, reporter] = await tryToCatch(simpleImport, name);
        
        if (!e)
            return reporter;
        
        if (e.code === 'ERR_UNSUPPORTED_DIR_IMPORT') {
            const fullName = require.resolve(name);
            
            [e, reporter] = await tryToCatch(simpleImport, fullName);
            
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

const getPutoutLoadDir = () => process.env.PUTOUT_LOAD_DIR;

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
