'use strict';

const Module = require('module');
const test = require('tape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const tryCatch = require('try-catch');
const {reRequire} = mockRequire;

test('get-plugins: user plugin', (t) => {
    const {_findPath} = Module;
    const rmVars = 'remove-unused-variables';
    
    const rmUnusedVars = require(`@putout/plugin-${rmVars}`);;
    
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
    
    const {code} = putout(`const t = 'hello'`);
    
    mockRequire.stopAll();
    Module._findPath = _findPath;
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('get-plugins: can not find', (t) => {
    const rmVars = 'remove-unused-variables';
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    reRequire('../lib/get-plugins');
    
    const putout = reRequire('..');
    
    const [e] = tryCatch(putout, `const t = 'hello'`);
    
    mockRequire.stopAll();
    
    const expected = 'Plugin "putout-plugin-remove-unused-variables could not be found!';
    
    t.equal(e.message, expected, 'should equal');
    t.end();
});

test('get-plugins: function', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);;
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('../lib/get-plugins');
    const putout = reRequire('..');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            [rmVars]: rmVarsPlugin
        }]
    });
    
    mockRequire.stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

