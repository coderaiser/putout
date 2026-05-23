import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-inherit', plugin],
    ],
});

test('nodejs: apply-inherit: report', (t) => {
    t.report('apply-inherit', `Use 'inherit' instead of 'stdio: [0, 1, 2]'`);
    t.end();
});

test('nodejs: apply-inherit: transform', (t) => {
    t.transform('apply-inherit');
    t.end();
});
