'use strict';

const fs = require('fs');

const stub = require('@cloudcmd/stub');

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole,
});

const {reRequire} = require('mock-require');

const formatter = require('@putout/formatter-dump');

test('test: format', (t) => {
    t.format(formatter, 'var');
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

test('test: formatSave', (t) => {
    const {
        existsSync,
        writeFileSync,
    } = fs;
    
    const existsSyncStub = stub().returns(false);
    const writeFileSyncStub = stub();
    
    fs.existsSync = existsSyncStub;
    fs.writeFileSync = writeFileSyncStub;
    
    const test = reRequire('..')(__dirname, {
        'remove-console': removeConsole,
    });
    
    test('formatSave', (t) => {
        t.formatSave(formatter, 'var');
        
        t.ok(writeFileSyncStub.called);
        t.end();
    });
    
    test('formatManySave', (t) => {
        t.formatManySave(formatter, ['var', 'var']);
        
        t.ok(writeFileSyncStub.called);
        t.end();
    });
    
    test('last', (t) => {
        fs.existsSync = existsSync;
        fs.writeFileSync = writeFileSync;
        t.end();
    });
    
    t.end();
});

