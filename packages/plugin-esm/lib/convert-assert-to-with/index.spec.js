import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assert-to-with', plugin],
    ],
});

test('plugin-convert-assert-to-with: report: convert-assert-to-with', (t) => {
    t.report('convert-assert-to-with', `Use 'with' instead of 'assert'`);
    t.end();
});

test('plugin-convert-assert-to-with: transform: convert-assert-to-with', (t) => {
    t.transform('convert-assert-to-with');
    t.end();
});

test('plugin-convert-assert-to-with: transform: call', (t) => {
    t.transform('call');
    t.end();
});
