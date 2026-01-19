import fs from 'node:fs';
import {stub} from 'supertape';
import {lint} from '@putout/processor-wasm/lint';
import {tryCatch} from 'try-catch';
import {rules} from '@putout/processor-wasm/plugin';
import {createUpdate} from './update.js';
import {createTest} from '../lib/test.js';

fs.writeFileSync = stub();

const NO_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const update = createUpdate();
const {writeFileSync} = fs;

const test = createTest(import.meta.url, {
    lint,
    extension: 'wast',
    plugins: rules,
});

const test2 = createTest(import.meta.url, {
    extension: 'wast',
    lint,
    plugins: rules,
});

test('transform: ext: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('ext');
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test2('test: transform: noTransformWithOptions: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.noTransformWithOptions('ext-no-transform', {});
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: transform: noTransformWithOptions: not-found', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const [error] = tryCatch(t.noTransformWithOptions, 'not-found', {});
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.match(error.message, 'ENOENT');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transform: with UPDATE env variable: pass', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.transform('ext');
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: no transform: with UPDATE env variable: pass', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    const result = t.noTransform('ext-no-transform');
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.equal(result.message, 'source fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transform: with UPDATE env variable: js', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.transform('ext');
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    t.ok(writeFileSyncStub.called, 'should write fixture');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: noTransform: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync, unlinkSync} = globalThis.__putout_test_fs;
    
    const writeFileSyncStub = stub();
    const unlinkSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    globalThis.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    t.noTransform('const');
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    globalThis.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.calledOnce(writeFileSyncStub);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transformWithOptions: with UPDATE env variable', (t) => {
    update(1);
    
    const {writeFileSync, unlinkSync} = globalThis.__putout_test_fs;
    
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    globalThis.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    t.transformWithOptions('const', {});
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    globalThis.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.ok(writeFileSyncStub.called);
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

test('test: ext: transformWithOptions: with UPDATE env variable: pass', (t) => {
    update(1);
    const {writeFileSync, unlinkSync} = globalThis.__putout_test_fs;
    
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    globalThis.__putout_test_fs.unlinkSync = unlinkSyncStub;
    
    const result = t.transformWithOptions('const', {});
    
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    globalThis.__putout_test_fs.unlinkSync = unlinkSync;
    
    t.equal(result.message, 'fixed fixture updated');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

fs.writeFileSync = writeFileSync;
