'use strict';

const {readFileSync} = require('fs');

const putout = require('../putout');
const loadPlugin = require('./load-plugin');
const parsePluginNames = require('./parse-plugin-names');

module.exports = ({babelPlugins = []}) => {
    const parsedNames = parsePluginNames(babelPlugins);
    const plugins = [];
    
    const namespace = 'babel';
    for (const [name, fn] of parsedNames) {
        const plugin = convert(name, loadPlugin({
            name,
            namespace,
            load,
            fn,
        }));
        
        plugins.push([name, plugin]);
    }
    
    return plugins;
};

function load(name) {
    const data = readFileSync(name, 'utf8');
    
    return putout(data, {
        plugins: [
            'convert-esm-to-commonjs',
        ],
    });
}

function convert(name, code) {
    const fn = Function('module', 'exports', code);
    const exports = {};
    const module = {
        exports,
    };
    
    const {visitor} = fn(module, exports);
    
    return {
        report: () => 'babel-plugin-${name}`',
        fix: visitor,
        find: ({push}) => ({
            Program(path) {
                push(path);
            },
        }),
    };
}

