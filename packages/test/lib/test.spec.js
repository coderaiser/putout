import formatter from '@putout/formatter-dump';
import * as removeConsoleFixture from '../test/fixture/remove-console.js';
import {createTest} from './test.js';
import {createUpdate} from '../test/update.js';

const update = createUpdate();

const test = createTest(import.meta.url, {
    'remove-console': removeConsoleFixture,
});

test('test: esm: format', async ({format}) => {
    update(1);
    await format(formatter, 'var');
    update();
});
