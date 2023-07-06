import removeConsoleFixture from '../test/fixture/remove-console.js';
import _createTest, {createTest} from './test.mjs';
import cjsTest from './test.js';
import formatter from '@putout/formatter-dump';
import {createUpdate} from '../test/update.js';

const update = createUpdate();

const test = createTest(import.meta.url, {
    'remove-console': removeConsoleFixture,
});

test('test: esm: default export same as commonjs', ({equal}) => {
    equal(_createTest, cjsTest);
});

test('test: esm: format', async ({format}) => {
    update(1);
    await format(formatter, 'var');
    update();
});
