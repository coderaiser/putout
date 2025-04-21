'use strict';

const fs = require('node:fs');
const {stub} = require('supertape');
const {lint} = require('@putout/processor-wasm/lint');
const tryCatch = require('try-catch');

const {rules} = require('@putout/processor-wasm/plugin');
const {createUpdate} = require('./update');

const {createTest} = require('..');

fs.writeFileSync = stub();
const NO_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const update = createUpdate();
const {writeFileSync} = fs;

const test = createTest(__dirname, {
    lint,
    extension: 'wast',
    plugins: rules,
});

const test2 = createTest(__dirname, {
    extension: 'wast',
    lint,
    plugins: rules,
});

test('transform: ext: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('ext');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test2('test: transform: noTransformWithOptions: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.noTransformWithOptions('ext-no-transform', {});
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: transform: noTransformWithOptions: not-found', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const [error] = tryCatch(t.noTransformWithOptions, 'not-found', {});
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.match(error.message, 'ENOENT');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transform: with UPDATE env variable: pass', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.transform('ext');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: no transform: with UPDATE env variable: pass', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.noTransform('ext-no-transform');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'source fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transform: with UPDATE env variable: js', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('ext');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: noTransform: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync, unlinkSync} = global.__putout_test_fs;
    
    const writeFileSyncStub = stub();
    const unlinkSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    t.noTransform('const');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.calledOnce(writeFileSyncStub);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transformWithOptions: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync, unlinkSync} = global.__putout_test_fs;
    
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    t.transformWithOptions('const', {});
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.ok(writeFileSyncStub.called);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transformWithOptions: with UPDATE env variable: pass', (t) => {
    update(1);
    const {writeFileSync, unlinkSync} = global.__putout_test_fs;
    
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    const result = t.transformWithOptions('const', {});
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

fs.writeFileSync = writeFileSync;
