import {writeFileSync} from 'node:fs';
import {stub} from 'supertape';
import formatter from '@putout/formatter-dump';
import * as removeConsoleFixture from '../test/fixture/remove-console.js';
import {createTest} from './test.js';
import {createUpdate} from '../test/update.js';

const update = createUpdate();

const test = createTest(import.meta.url, {
    'remove-console': removeConsoleFixture,
});

test('test: esm: format', async ({format}) => {
    globalThis.__putout_test_fs.writeFileSync = stub();
    update(1);
    await format(formatter, 'var');
    update();
    globalThis.__putout_test_fs.writeFileSync = writeFileSync;
});
