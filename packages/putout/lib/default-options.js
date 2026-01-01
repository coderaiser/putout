import * as loader from '@putout/engine-loader';
import * as runner from '@putout/engine-runner';
import {createProgress} from '@putout/engine-runner/progress';

export const defaultOptions = (opts = {}) => {
    const {
        parser = 'babel',
        printer = opts.printer || 'putout',
        fix = true,
        fixCount = 4,
        loadPlugins = loader.loadPlugins,
        loadPluginsAsync = loader.loadPluginsAsync,
        runPlugins = runner.runPlugins,
        progress = createProgress(),
    } = opts;
    
    return {
        ...opts,
        parser,
        printer,
        fix,
        fixCount,
        loadPlugins,
        loadPluginsAsync,
        runPlugins,
        progress,
    };
};
