'use strict';

const {join} = require('node:path');

const fs = require('node:fs');

const {stub} = require('supertape');

const {createUpdate} = require('./update');

fs.writeFileSync = stub();

const test = require('..')(__dirname, {
    'remove-console': require('@putout/plugin-remove-console'),
});

const NO_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};
const update = createUpdate();
const {writeFileSync} = fs;

test('transform: input and output are equal', (t) => {
    const fail = stub().returns({
        is: true,
        message: 'should fail when input === output',
    });
    
    global.__putout_test_fail = fail;
    
    t.transform('no-transform');
    delete global.__putout_test_fail;
    
    const args = [`'input' === 'output', use 'noTransform()'`];
    
    t.calledWith(fail, args);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('typescript');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: withOptions: with UPDATE env variable: no read', (t) => {
    update(1);
    
    const {writeFileSync, readFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    const readFileSyncStub = stub().returns('const a = 5');
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    global.__putout_test_fs.readFileSync = readFileSyncStub;
    
    t.transformWithOptions('typescript', {});
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    global.__putout_test_fs.readFileSync = readFileSync;
    
    const path = join(__dirname, 'fixture/typescript.ts');
    
    t.calledWith(readFileSyncStub, [path, 'utf8'], 'should not read fixture fix');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: noTransformWithOptions: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.noTransformWithOptions('no-transform-with-options', {});
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable: pass', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.transform('typescript');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: no transform: with UPDATE env variable: pass', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.noTransform('no-transform');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'source fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable: js', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('update');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('transform: with UPDATE env variable: with arg', (t) => {
    update(1);
    
    const {writeFileSync} = global.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    global.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('typescript', '\n');
    
    update();
    global.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.notCalled(writeFileSyncStub);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('noTransform: with UPDATE env variable', (t) => {
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

test('transformWithOptions: with UPDATE env variable', (t) => {
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

test('transformWithOptions: with UPDATE env variable: pass', (t) => {
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
