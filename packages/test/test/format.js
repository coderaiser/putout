'use strict';

const fs = require('fs');

const {stub} = require('supertape');

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole,
});

const {reRequire} = require('mock-require');

const formatter = require('@putout/formatter-dump');
const formatterProgress = require('@putout/formatter-progress');

test('test: format', (t) => {
    t.format(formatter, 'var');
    t.end();
});

test('test: format: options', (t) => {
    t.format(formatterProgress, 'var', {
        minCount: 10,
    });
    t.end();
});

test('test: no format', (t) => {
    t.noFormat(formatter, 'declared');
    t.end();
});

test('test: formatMany', (t) => {
    t.formatMany(formatter, ['var', 'var']);
    t.end();
});

(() => {
    const {
        existsSync,
        writeFileSync,
    } = fs;
    
    const existsSyncStub = stub().returns(false);
    const writeFileSyncStub = stub();
    
    fs.existsSync = existsSyncStub;
    fs.writeFileSync = writeFileSyncStub;
    
    process.env.UPDATE = 1;
    
    const test = reRequire('..')(__dirname, {
        'remove-console': require('@putout/plugin-remove-console'),
    });
    
    test('test: formatSave', (t) => {
        t.formatSave(formatter, 'var');
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: format: with UPDATE env variable', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        
        t.format(formatter, 'var');
        
        process.env.UPDATE = UPDATE;
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatManySave', (t) => {
        t.formatManySave(formatter, ['var', 'var']);
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatMany: with UPDATE env variable', (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        
        t.formatMany(formatter, ['var', 'var']);
        
        process.env.UPDATE = UPDATE;
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatSave: exists', (t) => {
        existsSyncStub.returns(true);
        
        t.formatSave(formatter, 'var');
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatManySave: exists', (t) => {
        existsSyncStub.returns(true);
        
        t.formatManySave(formatter, ['var', 'var']);
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    fs.existsSync = existsSync;
    fs.writeFileSync = writeFileSync;
    delete process.env.UPDATE;
    
    reRequire('..');
})();
