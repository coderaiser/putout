'use strict';

const test = require('supertape');
const {loadPluginsAsync} = require('./load-plugins-async');

test('@putout/engine-loader: loadPluginsAsync', async (t) => {
    const result = await loadPluginsAsync({
        pluginNames: [
            'remove-unused-variables',
        ],
    });
    
    const plugin = (await import('@putout/plugin-remove-unused-variables')).default;
    const expected = [{
        msg: '',
        rule: 'remove-unused-variables',
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

