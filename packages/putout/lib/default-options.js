'use strict';

const loader = require('@putout/engine-loader');
const runner = require('@putout/engine-runner');
const {createProgress} = require('@putout/engine-runner/progress');

module.exports.defaultOptions = (opts = {}) => {
    const {
        parser = 'babel',
        printer = opts.printer || 'putout',
        fix = true,
        fixCount = 3,
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
