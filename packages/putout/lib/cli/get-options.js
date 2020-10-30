'use strict';

const {dirname} = require('path');

const buildPlugins = require('./build-plugins');
const parseOptions = require('../parse-options');

module.exports = ({noConfig, plugins, name, transform, rulesdir}) => {
    const transformPlugins = buildPlugins(transform);
    
    if (noConfig)
        return {
            dir: dirname(name),
            plugins: [
                ...plugins,
                ...transformPlugins,
            ],
        };
    
    const result = parseOptions({
        name,
        rulesdir,
    });
    
    return {
        ...result,
        plugins: [
            ...result.plugins,
            ...transformPlugins,
        ],
    };
};

