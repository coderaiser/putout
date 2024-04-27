'use strict';

const process = require('node:process');
const {join, dirname} = require('node:path');

const buildPlugins = require('./build-plugins');
const parseOptions = require('../parse-options');

const {assign} = Object;
const {env} = process;
const {PUTOUT_CONFIG_FILE} = env;

const maybeConfig = {
    plugins: [],
};

PUTOUT_CONFIG_FILE && assign(maybeConfig, require(join(
    process.cwd(),
    PUTOUT_CONFIG_FILE,
)));

module.exports = ({noConfig, plugins, name, transform, rulesdir}) => {
    const transformPlugins = buildPlugins(transform);
    
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
