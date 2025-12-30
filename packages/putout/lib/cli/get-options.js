'use strict';

const process = require('node:process');
const {join, dirname} = require('node:path');

const buildPlugins = require('./build-plugins');
const _parseOptions = require('../parse-options');

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

module.exports = (overrides = {}) => {
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
