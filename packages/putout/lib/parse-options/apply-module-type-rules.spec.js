'use strict';

const {test} = require('supertape');
const applyModuleTypeRules = require('./apply-module-type-rules');

test('putout: parse-options: apply module type rules: module', (t) => {
    const options = {};
    
    const info = {
        type: 'module',
    };
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'convert-commonjs-to-esm': 'on',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: apply module type rules: commonjs', (t) => {
    const options = {};
    
    const info = {
        type: 'commonjs',
    };
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'convert-esm-to-commonjs': 'on',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: apply module type rules: no type', (t) => {
    const options = {};
    const info = {};
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'convert-esm-to-commonjs': 'on',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: apply module type rules: match exists', (t) => {
    const options = {
        match: {
            '*.js': {
                'remove-unused-variables': 'off',
            },
        },
    };
    const info = {};
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'convert-esm-to-commonjs': 'on',
                'remove-unused-variables': 'off',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

