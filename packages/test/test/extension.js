import fs from 'node:fs';
import process from 'node:process';
import {stub} from 'supertape';
import {lint} from '@putout/processor-wasm/lint';
import {tryCatch} from 'try-catch';
import {createUpdate} from './update.js';
import {createTest} from '../lib/test.js';

fs.writeFileSync = stub();

const NO_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const update = createUpdate();
const {writeFileSync} = fs;

const {entries} = Object;
const plugins = [
    ['remove-useless-args', {
        report: ({path}) => `Avoid useless arguments in '${path.node.index.value}' call`,
        fix: ({path, length}) => {
            path.node.instrArgs.length = length;
        },
        find: (ast, {push, traverse}) => {
            const funcs = {};
            const calls = {};
            
            traverse(ast, {
                Func(path) {
                    const {value} = path.node.name;
                    const {params} = path.node.signature;
                    
                    funcs[value] = params;
                },
                CallInstruction(path) {
                    const {index, instrArgs} = path.node;
                    const {value} = index;
                    
                    calls[value] = [path, instrArgs];
                },
            });
            
            for (const [name, [path, args]] of entries(calls)) {
                const {length} = funcs[name];
                
                if (length < args.length)
                    push({
                        path,
                        length,
                    });
            }
        },
    }],
];

const test = createTest(import.meta.url, {
    lint,
    extension: 'wast',
    plugins,
});

const test2 = createTest(import.meta.url, {
    extension: 'wast',
    lint,
    plugins,
});

const testExtensionFix = createTest(import.meta.url, {
    extension: 'wast',
    extensionFix: 'cde',
    lint,
    plugins,
});

const testExtensionFixWithJs = createTest(import.meta.url, {
    extension: 'wast',
    extensionFix: 'js',
    lint,
    plugins,
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

test('transform: ext: with UPDATE + UPDATE_EXTENSION env variables', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    process.env.UPDATE_EXTENSION = 'abc';
    
    t.transform('ext');
    
    delete process.env.UPDATE_EXTENSION;
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    const [first] = writeFileSyncStub.args[0];
    
    t.ok(first.endsWith('abc'), 'should write fixture with updated extension');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

testExtensionFix('transform: ext: with extensionFix', (t) => {
    update(1);
    
    const {writeFileSync} = globalThis.__putout_test_fs;
    const writeFileSyncStub = stub();
    
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    process.env.UPDATE_EXTENSION = 'abc';
    
    t.transform('ext');
    
    delete process.env.UPDATE_EXTENSION;
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    const [first] = writeFileSyncStub.args[0];
    
    t.ok(first.endsWith('cde'), 'should write fixture with updated extension');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

testExtensionFixWithJs('transform: ext: with extension: read', (t) => {
    const {readFileSync} = globalThis.__putout_test_fs;
    const readFileSyncStub = stub().returns('');
    
    globalThis.__putout_test_fs.readFileSync = readFileSyncStub;
    
    t.noTransform('ext-no-transform');
    
    globalThis.__putout_test_fs.readFileSync = readFileSync;
    
    const [first] = readFileSyncStub.args[0];
    
    t.ok(first.endsWith('wast'), 'should write fixture with updated extension');
    t.end();
}, NO_CHECK_ASSERTIONS_COUNT);

testExtensionFix('putout: test: noTransform: ext: with extensionFix', (t) => {
    const {unlinkSync, writeFileSync} = globalThis.__putout_test_fs;
    const unlinkSyncStub = stub();
    const writeFileSyncStub = stub();
    
    update(1);
    
    globalThis.__putout_test_fs.unlinkSync = unlinkSyncStub;
    globalThis.__putout_test_fs.writeFileSync = writeFileSyncStub;
    
    t.noTransform('ext');
    
    globalThis.__putout_test_fs.unlinkSync = unlinkSync;
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
    
    const [first] = unlinkSyncStub.args[0];
    
    update();
    
    t.ok(first.endsWith('cde'), 'should remove fixture with updated extension');
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
