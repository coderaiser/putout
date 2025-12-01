import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-tape-to-supertape', convert],
    ],
});

test('plugin-tape: convert-tape-to-supertape: report: try-to', (t) => {
    t.report('try-to', `Use 'supertape' instead of 'tape'`);
    t.end();
});

test('plugin-tape: convert-tape-to-supertape: try-to', (t) => {
    t.transform('try-to');
    t.end();
});

test('plugin-tape: convert-tape-to-supertape: try-to-tape', (t) => {
    t.transform('try-to-tape');
    t.end();
});

test('plugin-tape: convert-tape-to-supertape: try-to-tape: tape', (t) => {
    t.transform('tape');
    t.end();
});
