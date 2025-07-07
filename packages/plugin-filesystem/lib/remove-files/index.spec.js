import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-files', plugin],
    ],
});

test('packages: remove-files: no report: no-options', (t) => {
    t.noReport('no-options');
    t.end();
});

test('packages: remove-files: report', (t) => {
    t.reportWithOptions('remove-files', `Remove '*.swp': '/home/coderaiser/putout/lib/putout.js.swp'`, {
        names: ['*.swp'],
    });
    t.end();
});

test('packages: remove-files: transform with options', (t) => {
    t.transformWithOptions('remove-files', {
        names: ['*.swp'],
    });
    t.end();
});

test('packages: remove-files: progress', async ({progressWithOptions}) => {
    const options = {
        names: ['*.swp'],
    };
    
    await progressWithOptions('remove-files', options, {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'remove-files',
    });
});
