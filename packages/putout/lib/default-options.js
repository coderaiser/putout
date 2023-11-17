'use strict';

const loader = require('@putout/engine-loader');
const runner = require('@putout/engine-runner');

module.exports.defaultOptions = (opts = {}) => {
    const {
        parser = 'babel',
        printer = opts.printer || 'putout',
        fix = true,
        fixCount = 2,
        loadPlugins = loader.loadPlugins,
        loadPluginsAsync = loader.loadPluginsAsync,
        runPlugins = runner.runPlugins,
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
    };
};
