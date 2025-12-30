import tryCatch from 'try-catch';
import {validateRulesRelations} from '@putout/engine-loader';
import {defaultOptions} from './default-options.js';
import {cutShebang} from './shebang.js';
import {parseError} from './parse-error.js';

const maybeParseError = (a) => !a ? [] : parseError(a, 'loader');

// why we pass 'source' to 'transform()'?
// because we need to calculate position in a right way
// and determine is shebang is existing
//
// 25     return {¬
// 26         line: shebang ? line + 1 : line,¬
// 27         column,¬
// 28     };¬
//
export const transform = (ast, source, opts) => {
    opts = defaultOptions(opts);
    
    const {
        plugins: pluginNames,
        cache,
        rules,
        fix,
        fixCount,
        loadPlugins,
        runPlugins,
        progress,
    } = opts;
    
    const [, shebang] = cutShebang(source);
    
    const [validationError] = tryCatch(validateRulesRelations, {
        rules,
        pluginNames,
    });
    
    const plugins = loadPlugins({
        pluginNames,
        cache,
        rules,
    });
    
    const places = runPlugins({
        ast,
        shebang,
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

export const transformAsync = async (ast, source, opts) => {
    opts = defaultOptions(opts);
    
    const {
        plugins: pluginNames,
        cache,
        rules,
        fix,
        fixCount,
        loadPluginsAsync,
        runPlugins,
        progress,
    } = opts;
    
    const [, shebang] = cutShebang(source);
    
    const [validationError] = tryCatch(validateRulesRelations, {
        rules,
        pluginNames,
    });
    
    const plugins = await loadPluginsAsync({
        pluginNames,
        cache,
        rules,
    });
    
    const places = runPlugins({
        ast,
        shebang,
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
