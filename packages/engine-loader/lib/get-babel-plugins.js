'use strict';

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
        }));
        
        plugins.push([name, plugin]);
    }
    
    return plugins;
};

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

