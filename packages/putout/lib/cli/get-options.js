import process from 'node:process';
import {join, dirname} from 'node:path';
import {createRequire} from 'node:module';
import {parseOptions as _parseOptions} from '#parse-options';
import buildPlugins from './build-plugins.js';

const require = createRequire(import.meta.url);
const {assign} = Object;
const {env} = process;

const getMaybeConfig = () => {
    const config = {
        plugins: [],
    };
    
    const {PUTOUT_CONFIG_FILE} = env;
    
    PUTOUT_CONFIG_FILE && assign(config, require(join(
        process.cwd(),
        PUTOUT_CONFIG_FILE,
    )));
    
    return config;
};

export default (overrides = {}) => {
    const {
        noConfig,
        plugins = [],
        name,
        transform,
        rulesdir,
        parseOptions = _parseOptions,
    } = overrides;
    
    const transformPlugins = buildPlugins(transform);
    const maybeConfig = getMaybeConfig();
    
    if (noConfig)
        return {
            ...maybeConfig,
            dir: dirname(name),
            plugins: [
                ...plugins,
                ...transformPlugins,
                ...maybeConfig.plugins,
            ],
        };
    
    const result = parseOptions({
        name,
        rulesdir,
    });
    
    return {
        ...result,
        ...maybeConfig,
        plugins: [
            ...result.plugins,
            ...transformPlugins,
            ...maybeConfig.plugins,
        ],
    };
};
