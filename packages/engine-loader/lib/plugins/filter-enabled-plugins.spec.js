'use strict';

const {test} = require('supertape');
const {filterEnabledPlugins} = require('./filter-enabled-plugins');

test('putout: engine-loader: filter-enabled-plugins', (t) => {
    const plugins = [
        ['nodejs/convert-esm-to-commonjs', ['off', {}]],
    ];
    
    const cookedRules = [];
    
    const result = filterEnabledPlugins({
        plugins,
        cookedRules,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: engine-loader: filter-enabled-plugins: rules', (t) => {
    const convert = {};
    const plugins = [
        [
            'nodejs/convert-esm-to-commonjs',
            ['off', convert],
        ],
    ];
    
    const cookedRules = [{
        rule: 'nodejs/convert-esm-to-commonjs',
        state: 'on',
    }];
    
    const result = filterEnabledPlugins({
        plugins,
        cookedRules,
    });
    
    const expected = [{
        msg: undefined,
        options: undefined,
        plugin: {},
        rule: 'nodejs/convert-esm-to-commonjs',
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
