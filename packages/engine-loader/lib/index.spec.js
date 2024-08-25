'use strict';

const tryCatch = require('try-catch');
const test = require('supertape');
const {loadPlugins} = require('.');
const {validateRules} = require('./index');

test('engine-loader: load-plugins', (t) => {
    const result = loadPlugins({
        pluginNames: ['remove-unused-variables'],
    });
    
    t.equal(result.length, 1);
    t.end();
});

test('engine-loader: validate-rules: exports', (t) => {
    const pluginNames = [
        ['estrace/trace', {
            rules: {},
        }],
    ];
    
    const rules = {
        'estrace/trace': 'off',
    };
    
    const [error] = tryCatch(validateRules, {
        pluginNames,
        rules,
    });
    
    t.equal(error.message, `Rule 'estrace/trace' cannot be applied to nested plugin 'estrace/trace'`);
    t.end();
});

