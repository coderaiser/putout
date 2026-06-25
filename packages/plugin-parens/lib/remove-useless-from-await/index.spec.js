import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-from-await', plugin],
    ],
});

test('parens: remove-useless-from-await: report', (t) => {
    t.report('remove-useless-from-await', `Remove useless parens around 'await'`);
    t.end();
});

test('parens: remove-useless-from-await: transform', (t) => {
    t.transform('remove-useless-from-await');
    t.end();
});

test('parens: remove-useless-from-await: no report: no-parens', (t) => {
    t.noReport('no-parens');
    t.end();
});
