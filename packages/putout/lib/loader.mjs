import putout from './putout.js';
import ignores from './ignores.js';
import parseOptions from './parse-options/index.js';

const cwd = process.cwd();

const toLoad = (transformSource) => async (url, context, defaultLoad) => {
    const {source: rawSource} = await defaultLoad(url, context);
    
    if (!rawSource)
        return {
            format: 'commonjs',
        };
    
    const {source} = await transformSource(rawSource, {
        url,
    });
    
    return {
        source,
        format: 'module',
    };
};

export const transformSource = (source, context) => {
    const {url} = context;
    
    const name = url.replace('file://', '');
    const options = parseOptions({
        name,
    });
    
    if (ignores(cwd, name, options)) {
        return {
            source,
        };
    }
    
    const {code} = putout(source, options);
    
    return {
        source: code,
    };
};

export const load = toLoad(transformSource);

