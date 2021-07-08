'use strict';

const {stub} = require('supertape');

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

test('test: message', (t) => {
    t.report('property-identifier', [
        'Unexpected "console" call',
        'Unexpected "console" call',
        'Unexpected "console" call',
    ]);
    
    t.end();
});

test('test: message', (t) => {
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

(() => {
    const fs = require('fs');
    const {reRequire} = require('mock-require');
    const {writeFileSync} = fs;
    const writeFileSyncStub = stub();
    
    fs.writeFileSync = writeFileSyncStub;
    
    process.env.UPDATE = 1;
    
    const test = reRequire('..')(__dirname, {
        'remove-console': require('@putout/plugin-remove-console'),
    });
    
    test('transform: with UPDATE env variable', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        
        t.transform('typescript', '\n');
        
        process.env.UPDATE = UPDATE;
        
        t.ok(writeFileSyncStub.called);
        t.end();
    });
    
    fs.writeFileSync = writeFileSync;
    delete process.env.UPDATE;
    
    reRequire('..');
})();
