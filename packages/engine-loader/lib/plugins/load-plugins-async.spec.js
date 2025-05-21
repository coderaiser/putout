'use strict';

const tryToCatch = require('try-to-catch');
const test = require('supertape');
const {loadPluginsAsync} = require('./load-plugins-async');

test('@putout/engine-loader: loadPluginsAsync', async (t) => {
    const result = await loadPluginsAsync({
        pluginNames: [
            'remove-debugger',
        ],
    });
    
    const plugin = (await import('@putout/plugin-remove-debugger')).default;
    const expected = [{
        msg: '',
        rule: 'remove-debugger',
        options: {},
        plugin,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('@putout/engine-loader: loadPluginsAsync: disabled: rule', async (t) => {
    const result = await loadPluginsAsync({
        rules: {
            'remove-unused-variables': 'off',
        },
        pluginNames: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('@putout/engine-loader: loadPluginsAsync: not found', async (t) => {
    const [error] = await tryToCatch(loadPluginsAsync, {
        pluginNames: ['hello'],
    });
    
    t.equal(error.message, `Cannot find package 'putout-plugin-hello'`);
    t.end();
});
