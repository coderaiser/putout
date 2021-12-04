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

test('test: format', async ({format}) => {
    await format(formatter, 'var');
});

test('test: format: options', async ({format}) => {
    await format(formatterProgress, 'var', {
        minCount: 10,
    });
});

test('test: no format', async ({noFormat}) => {
    await noFormat(formatter, 'declared');
});

test('test: formatMany', async ({formatMany}) => {
    await formatMany(formatter, ['var', 'var']);
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
    
    test('test: formatSave', async (t) => {
        await t.formatSave(formatter, 'var');
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: format: with UPDATE env variable', async (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        
        await t.format(formatter, 'var');
        
        process.env.UPDATE = UPDATE;
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatManySave', async (t) => {
        await t.formatManySave(formatter, ['var', 'var']);
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatMany: with UPDATE env variable', async (t) => {
        const {UPDATE} = process.env;
        process.env.UPDATE = 1;
        
        await t.formatMany(formatter, ['var', 'var']);
        
        process.env.UPDATE = UPDATE;
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatSave: exists', async (t) => {
        existsSyncStub.returns(true);
        
        await t.formatSave(formatter, 'var');
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    test('test: formatManySave: exists', async (t) => {
        existsSyncStub.returns(true);
        
        await t.formatManySave(formatter, ['var', 'var']);
        
        t.ok(writeFileSyncStub.called);
        t.end();
    }, {checkAssertionsCount: false});
    
    fs.existsSync = existsSync;
    fs.writeFileSync = writeFileSync;
    delete process.env.UPDATE;
    
    reRequire('..');
})();
