import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-default-to-named', plugin],
    ],
});

test('montag: convert-default-to-named: report', (t) => {
    t.report('convert-default-to-named', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('montag: convert-default-to-named: transform', (t) => {
    t.transform('convert-default-to-named');
    t.end();
});
