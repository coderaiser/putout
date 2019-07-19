'use strict';

const Module = require('module');
const test = require('supertape');
const stub = require('@cloudcmd/stub');
const tryCatch = require('try-catch');
const mockRequire = require('mock-require');
const {
    reRequire,
    stopAll,
} = mockRequire;

const putout = require('..');

test('get-plugins: user plugin', (t) => {
    const {_findPath} = Module;
    const rmVars = 'remove-unused-variables';
    
    const rmUnusedVars = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    mockRequire(`putout-plugin-${rmVars}`, rmUnusedVars);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    Module._findPath = stub((name, paths) => {
        if (!name.indexOf(`@putout/plugin-${rmVars}`))
            return false;
        
        if (name === `putout-plugin-${rmVars}`) {
            return name;
        }
        
        return _findPath(name, paths);
    });
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [
            rmVars,
        ],
    });
    
    mockRequire.stopAll();
    Module._findPath = _findPath;
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('get-plugins: browser build with bundled plugins', (t) => {
    const {plugins} = Module;
    Module.plugins = {
        abc: stub(),
    };
    
    const [e] = tryCatch(putout, `const t = 'hello'`, {
        plugins: [
            'abc',
        ],
    });
    
    Module.plugins = plugins;
    
    t.notOk(e, 'should find plugin in Module.plugins');
    t.end();
});

test('get-plugins: can not find', (t) => {
    const {_findPath} = Module;
    const rmVars = 'remove-unused-variables';
    
    Module._findPath = stub((name, paths) => {
        if (!name.indexOf(`@putout/plugin-${rmVars}`))
            return false;
        
        return _findPath(name, paths);
    });
    
    const [e] = tryCatch(putout, `const t = 'hello'`, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    mockRequire.stopAll();
    
    Module._findPath = _findPath;
    
    const expected = 'Plugin "putout-plugin-remove-unused-variables could not be found!';
    
    t.equal(e.message, expected, 'should equal');
    t.end();
});

test('get-plugins: function', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('get-plugins: function: rules', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            'brand-new-rule': {
                rules: {
                    [rmVars]: rmVarsPlugin,
                },
            },
        }],
    });
    
    stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('get-plugins: function', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('get-plugins: function', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('get-plugins: disabled rule', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    const {code} = putout(`const t = 'hello'`, {
        rules: {
            [rmVars]: false,
        },
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    stopAll();
    
    t.equal(code, `const t = 'hello'`, 'should equal');
    t.end();
});

