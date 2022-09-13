'use strict';

const {stub} = require('supertape');

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

test('transform: with UPDATE env variable: js', (t) => {
    const {UPDATE} = process.env;
    process.env.UPDATE = 1;
    const {writeFileSync} = global.__putout_test_fs;
    
    const writeFileSyncStub = stub();
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('update');
    
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

