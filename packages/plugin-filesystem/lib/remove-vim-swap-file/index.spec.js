import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-vim-swap-file', plugin],
    ],
});

test('packages: remove-vim-swap-file: report', (t) => {
    t.report('remove-vim-swap-file', `Remove '*.swp': '/home/coderaiser/putout/lib/putout.js.swp'`);
    t.end();
});

test('packages: remove-vim-swap-file: transform', (t) => {
    t.transform('remove-vim-swap-file');
    t.end();
});

test('packages: remove-vim-swap-file: progress', async ({progress}) => {
    await progress('remove-vim-swap-file', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'remove-vim-swap-file',
    });
});
