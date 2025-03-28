import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout-config/remove-empty-file', plugin],
    ],
});

test('putout-config: remove-empty-file: report', (t) => {
    t.report('remove-empty-file', `Remove empty '.putout.json'`);
    t.end();
});

test('putout-config: remove-empty-file: transform', (t) => {
    t.transform('remove-empty-file');
    t.end();
});

test('putout-config: remove-empty-file: progress', async ({progress}) => {
    await progress('remove-empty-file', {
        i: 1,
        n: 3,
        percent: '33%',
        rule: 'putout-config/remove-empty-file',
    });
});
