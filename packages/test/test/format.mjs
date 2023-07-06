import fs from 'fs';
import {stub} from 'supertape';
import tryToCatch from 'try-to-catch';
import removeConsole from '@putout/plugin-remove-console';
import removeConsoleFixture from './fixture/remove-console.js';
import {createTest} from '../lib/test.mjs';
import formatter from '@putout/formatter-dump';
import formatterProgress from '@putout/formatter-progress';
import {createUpdate} from './update.js';

const update = createUpdate();

const NO_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const test = createTest(import.meta.url, {
    'remove-console': removeConsoleFixture,
});

test('test: format: no update', async ({format}) => {
    update(0);
    await format(formatter, 'empty');
    update();
});

test('test: format: options', async ({format}) => {
    update(1);
    await format(formatterProgress, 'var', {
        minCount: 10,
    });
    update();
});

test('test: no format', async ({noFormat}) => {
    await noFormat(formatter, 'declared');
});

const {existsSync, writeFileSync} = fs;

const existsSyncStub = stub().returns(false);
const writeFileSyncStub = stub();

global.__putout_test_update = true;

const testUpdate = createTest(import.meta.url, {
    'remove-console': removeConsole,
});

global.__putout_test_update = false;
global.__putout_test_fs = {
    existsSync: existsSyncStub,
    writeFileSync: writeFileSyncStub,
};

testUpdate('test: formatSave', async ({ok, format}) => {
    update(1);
    await format(formatter, 'var');
    update();
    
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatSave: success', async ({equal, format}) => {
    update(1);
    
    const {message} = await format(formatter, 'var');
    
    update();
    equal(message, 'fixed fixture updated');
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatManySave: success', async ({equal, formatMany}) => {
    update(1);
    
    const {message} = await formatMany(formatter, ['var']);
    
    update();
    equal(message, 'fixed fixture updated');
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatManySave: not array', async ({equal, formatMany}) => {
    update(1);
    
    const [error] = await tryToCatch(formatMany, formatter, 'var');
    
    update();
    equal(error.message, `☝️ Looks like 'formatMany()' received 'names' with type: 'string', expected: 'array'`);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatMany: not array', async ({equal, formatMany}) => {
    const [error] = await tryToCatch(formatMany, formatter, 'var');
    equal(error.message, `☝️ Looks like 'formatMany()' received 'names' with type: 'string', expected: 'array'`);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: format: with UPDATE env variable', async ({ok, format}) => {
    update(1);
    await format(formatter, 'var');
    update();
    
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: format: with UPDATE=0 env variable', async ({ok, format}) => {
    update(1);
    await format(formatter, 'var');
    update();
    
    global.__putout_test_update = true;
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: format: with UPDATE=1 env variable', async ({ok, format}) => {
    update(1);
    await format(formatter, 'var');
    update();
    
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatMany: update', async ({ok, formatMany}) => {
    update(1);
    await formatMany(formatter, ['var', 'var']);
    update();
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatMany: with UPDATE env variable', async ({ok, formatMany}) => {
    update(1);
    await formatMany(formatter, ['var', 'var']);
    update();
    
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatSave: exists', async ({ok, format}) => {
    existsSyncStub.returns(true);
    
    update(1);
    await format(formatter, 'var');
    update(0);
    
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

testUpdate('test: formatManySave: exists', async ({ok, formatMany}) => {
    existsSyncStub.returns(true);
    
    update(1);
    await formatMany(formatter, ['var', 'var']);
    update();
    
    ok(writeFileSyncStub.called);
}, NO_CHECK_ASSERTIONS_COUNT);

fs.existsSync = existsSync;
fs.writeFileSync = writeFileSync;
