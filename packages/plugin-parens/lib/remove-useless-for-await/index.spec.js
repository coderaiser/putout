import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-for-await', plugin],
    ],
});

test('parens: remove-useless-for-await: report', (t) => {
    t.report('remove-useless-for-await', `Remove useless parens around 'await'`);
    t.end();
});

test('parens: remove-useless-for-await: transform', (t) => {
    t.transform('remove-useless-for-await');
    t.end();
});

test('parens: remove-useless-for-await: no report: no-parens', (t) => {
    t.noReport('no-parens');
    t.end();
});
