'use strict';

const {stub} = require('supertape');
const putout = require('@putout/plugin-putout');

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole,
});

test('test: message', (t) => {
    t.report('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('test: ts', (t) => {
    t.report('typescript', 'Unexpected "console" call');
    t.end();
});

test('test: message: all messages', (t) => {
    t.report('property-identifier', [
        'Unexpected "console" call',
        'Unexpected "console" call',
        'Unexpected "console" call',
    ]);
    t.end();
});

test('test: no report', (t) => {
    t.noReport('declared');
    t.end();
});

test('test: reportCode', (t) => {
    t.reportCode('console.log()', 'Unexpected "console" call');
    t.end();
});

test('test: transformCode', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});

test('test: noTransformCode', (t) => {
    t.noTransformCode('alert()');
    t.end();
});

test('test: property identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

test('test: property literal', (t) => {
    t.transform('property-literal', '\n\n');
    t.end();
});

test('test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('test: transform: typescript', (t) => {
    t.transform('typescript', '\n');
    t.end();
});

test('test: transform: plugin', (t) => {
    t.transform('plugin', {
        putout,
    });
    t.end();
});

test('test: transform: rule of a plugin: remove-unused-variables', (t) => {
    t.transform('remove-unused-variables', {
        'extract-object-properties': require('@putout/plugin-extract-object-properties'),
        'remove': require('@putout/plugin-remove-unused-variables'),
        'putout/convert-replace-with': putout.rules['convert-replace-with'],
    });
    t.end();
});

(() => {
    const fs = require('fs');
    const {reRequire} = require('mock-require');
    const {writeFileSync} = fs;
    
    fs.writeFileSync = stub();
    
    process.env.UPDATE = 1;
    
    const test = reRequire('..')(__dirname, {
        'remove-console': require('@putout/plugin-remove-console'),
    });
    
    test('transform: with UPDATE env variable', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        const {writeFileSync} = global.__putout_test_fs;
        
        const writeFileSyncStub = stub();
        global.__putout_test_fs.writeFileSync = writeFileSyncStub;
        
        t.transform('typescript');
        
        process.env.UPDATE = UPDATE;
        global.__putout_test_fs.writeFileSync = writeFileSync;
        
        t.ok(writeFileSyncStub.called, 'should write fixture');
        t.end();
    }, {checkAssertionsCount: false});
    
    test('transform: with UPDATE env variable: with arg', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        const {writeFileSync} = global.__putout_test_fs;
        
        const writeFileSyncStub = stub();
        global.__putout_test_fs.writeFileSync = writeFileSyncStub;
        
        t.transform('typescript', '\n');
        
        process.env.UPDATE = UPDATE;
        global.__putout_test_fs.writeFileSync = writeFileSync;
        
        t.notOk(writeFileSyncStub.called, 'should not write fixture');
        t.end();
    }, {checkAssertionsCount: false});
    
    test('noTransform: with UPDATE env variable', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        const {writeFileSync, unlinkSync} = global.__putout_test_fs;
        
        const writeFileSyncStub = stub();
        const unlinkSyncStub = stub();
        
        global.__putout_test_fs.writeFileSync = writeFileSyncStub;
        global.__putout_test_fs.unlinkSync = unlinkSyncStub;
        
        t.noTransform('const');
        
        process.env.UPDATE = UPDATE;
        global.__putout_test_fs.writeFileSync = writeFileSync;
        global.__putout_test_fs.unlinkSync = unlinkSync;
        
        t.notOk(writeFileSyncStub.called, 'should not write fixture');
        t.end();
    }, {checkAssertionsCount: false});
    
    test('transformWithOptions: with UPDATE env variable', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        const {writeFileSync, unlinkSync} = global.__putout_test_fs;
        const unlinkSyncStub = stub();
        
        const writeFileSyncStub = stub();
        global.__putout_test_fs.writeFileSync = writeFileSyncStub;
        global.__putout_test_fs.unlinkSync = unlinkSyncStub;
        
        t.transformWithOptions('const', {});
        
        process.env.UPDATE = UPDATE;
        global.__putout_test_fs.writeFileSync = writeFileSync;
        global.__putout_test_fs.unlinkSync = unlinkSync;
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    fs.writeFileSync = writeFileSync;
    delete process.env.UPDATE;
    
    reRequire('..');
})();
