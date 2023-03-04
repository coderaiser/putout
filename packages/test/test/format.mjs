import fs from 'fs';
import {stub} from 'supertape';
import tryToCatch from 'try-to-catch';

import removeConsole from '@putout/plugin-remove-console';

import removeConsoleFixture from './fixture/remove-console.js';
import {createTest} from '../lib/test.mjs';

import formatter from '@putout/formatter-dump';
import formatterProgress from '@putout/formatter-progress';

const test = createTest(import.meta.url, {
    'remove-console': removeConsoleFixture,
});

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

const {
    existsSync,
    writeFileSync,
} = fs;

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

testUpdate('test: formatSave', async ({ok, formatSave}) => {
    await formatSave(formatter, 'var');
    
    ok(writeFileSyncStub.called);
}, {checkAssertionsCount: false});

testUpdate('test: formatSave: success', async ({equal, formatSave}) => {
    const {message} = await formatSave(formatter, 'var');
    equal(message, 'fixture updated');
}, {checkAssertionsCount: false});

testUpdate('test: formatManySave: success', async ({equal, formatManySave}) => {
    const {message} = await formatManySave(formatter, ['var']);
    equal(message, 'fixture updated');
}, {checkAssertionsCount: false});

testUpdate('test: formatManySave: not array', async ({equal, formatManySave}) => {
    const [error] = await tryToCatch(formatManySave, formatter, 'var');
    equal(error.message, `☝️ Looks like 'formatManySave()' received 'names' with type: 'string', expected: 'array'`);
}, {checkAssertionsCount: false});

testUpdate('test: formatMany: not array', async ({equal, formatMany}) => {
    const [error] = await tryToCatch(formatMany, formatter, 'var');
    equal(error.message, `☝️ Looks like 'formatMany()' received 'names' with type: 'string', expected: 'array'`);
}, {checkAssertionsCount: false});

testUpdate('test: format: with UPDATE env variable', async ({ok, format}) => {
    global.__putout_test_update = true;
    await format(formatter, 'var');
    
    global.__putout_test_update = false;
    ok(writeFileSyncStub.called);
}, {checkAssertionsCount: false});

testUpdate('test: formatManySave', async ({ok, formatManySave}) => {
    await formatManySave(formatter, ['var', 'var']);
    ok(writeFileSyncStub.called);
}, {checkAssertionsCount: false});

testUpdate('test: formatMany: with UPDATE env variable', async ({ok, formatMany}) => {
    global.__putout_test_update = true;
    await formatMany(formatter, ['var', 'var']);
    
    global.__putout_test_update = false;
    ok(writeFileSyncStub.called);
}, {checkAssertionsCount: false});

testUpdate('test: formatSave: exists', async ({ok, formatSave}) => {
    existsSyncStub.returns(true);
    
    await formatSave(formatter, 'var');
    
    ok(writeFileSyncStub.called);
}, {checkAssertionsCount: false});

testUpdate('test: formatManySave: exists', async ({ok, formatManySave}) => {
    existsSyncStub.returns(true);
    
    await formatManySave(formatter, ['var', 'var']);
    
    ok(writeFileSyncStub.called);
}, {checkAssertionsCount: false});

fs.existsSync = existsSync;
fs.writeFileSync = writeFileSync;
