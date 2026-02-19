import {tryCatch} from 'try-catch';
import {validateRulesRelations} from '@putout/engine-loader';
import {defaultOptions} from './default-options.js';
import {parseError} from './parse-error.js';

const maybeParseError = (a) => !a ? [] : parseError(a, 'loader');

export const transform = (ast, opts) => {
    opts = defaultOptions(opts);
    
    const {
        plugins: pluginNames,
        rules,
        fix,
        fixCount,
        loadPlugins,
        runPlugins,
        progress,
    } = opts;
    
    const [validationError] = tryCatch(validateRulesRelations, {
        rules,
        pluginNames,
    });
    
    const plugins = loadPlugins({
        pluginNames,
        rules,
    });
    
    const places = runPlugins({
        ast,
        fix,
        fixCount,
        plugins,
        progress,
    });
    
    return [
        ...maybeParseError(validationError),
        ...places,
    ];
};

export const transformAsync = async (ast, opts) => {
    opts = defaultOptions(opts);
    
    const {
        plugins: pluginNames,
        rules,
        fix,
        fixCount,
        loadPluginsAsync,
        runPlugins,
        progress,
    } = opts;
    
    const [validationError] = tryCatch(validateRulesRelations, {
        rules,
        pluginNames,
    });
    
    const plugins = await loadPluginsAsync({
        pluginNames,
        rules,
    });
    
    const places = runPlugins({
        ast,
        fix,
        fixCount,
        plugins,
        progress,
    });
    
    return [
        ...maybeParseError(validationError),
        ...places,
    ];
};
