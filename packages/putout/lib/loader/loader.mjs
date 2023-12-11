import process from 'node:process';
import {putoutAsync} from '../putout.js';
import ignores from '../ignores.js';
import parseOptions from '../parse-options/index.js';

const cwd = process.cwd();

const toLoad = (transformSource) => async (url, context, nextLoad) => {
    const {format, source: rawSource} = await nextLoad(url, context);
    
    if (format !== 'module')
        return nextLoad(url);
    
    const {source} = await transformSource(rawSource, {
        url,
    });
    
    return {
        format: 'module',
        source,
    };
};

export const transformSource = async (source, context) => {
    const {url} = context;
    const name = url.replace('file://', '');
    
    const options = parseOptions({
        name,
    });
    
    if (ignores(cwd, name, options))
        return {
            source,
        };
    
    const {code} = await putoutAsync(String(source), {
        printer: 'putout',
        ...options,
    });
    
    return {
        source: Buffer.from(code),
    };
};

export const load = toLoad(transformSource);
