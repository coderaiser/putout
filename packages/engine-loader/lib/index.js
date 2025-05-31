'use strict';

const {createAsyncLoader} = require('./load/async-loader');
const {parsePluginNames} = require('./plugins/parse-plugin-names');
const parseProcessorNames = require('./processors/parse-processor-names');

const {loadPluginsAsync} = require('./plugins/load-plugins-async');
const {loadPlugins} = require('./plugins/load-plugins');

const {validateRules} = require('./rules');

const {check} = require('./check');

module.exports.loadPlugins = loadPlugins;
module.exports.loadPluginsAsync = loadPluginsAsync;
module.exports.loadProcessorsAsync = async (options, load) => {
    check(options);
    
    const {processors = []} = options;
    const parsedProcessors = parseProcessorNames(processors);
    const loadProcessor = createAsyncLoader('processor');
    
    const list = [];
    
    for (const [name, fn] of parsedProcessors) {
        if (fn) {
            list.push(fn);
            continue;
        }
        
        list.push(loadProcessor(name, load));
    }
    
    return await Promise.all(list);
};

module.exports.createAsyncLoader = createAsyncLoader;

module.exports.validateRules = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    const items = parsePluginNames(pluginNames);
    
    validateRules({
        rules,
        items,
    });
};
