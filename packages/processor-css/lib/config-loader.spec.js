'use strict';

const {test, stub} = require('supertape');
const {createConfigLoader} = require('./config-loader');
const defaultConfig = require('../stylelintrc');

test('putout: processor: css: config-loader: no config found', async (t) => {
    const cosmiconfig = stub().returns({
        search: stub().returns(null),
    });
    
    const loadConfig = createConfigLoader({
        cosmiconfig,
    });
    const result = await loadConfig();
    
    t.deepEqual(result, defaultConfig);
    t.end();
});

test('putout: processor: css: config-loader: config found', async (t) => {
    const cosmiconfig = stub().returns({
        search: stub().returns({
            config: {
                rules: {
                    indentation: 3,
                },
            },
        }),
    });
    
    const loadConfig = createConfigLoader({
        cosmiconfig,
    });
    const result = await loadConfig();
    const expected = 3;
    
    t.deepEqual(result.rules.indentation, expected);
    t.end();
});

