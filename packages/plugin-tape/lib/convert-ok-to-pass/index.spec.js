import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-ok-to-pass', plugin],
    ],
});

test('tape: convert-ok-to-pass: report', (t) => {
    t.report('convert-ok-to-pass', `Use 't.pass()' instead of 't.ok()'`);
    t.end();
});

test('tape: convert-ok-to-pass: transform', (t) => {
    t.transform('convert-ok-to-pass');
    t.end();
});
