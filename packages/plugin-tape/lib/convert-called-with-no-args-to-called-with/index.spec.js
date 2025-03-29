import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-called-with-no-args-to-called-with', convert],
    ],
});

test('plugin-tape: convert-called-with-no-args-to-called-with: report: args', (t) => {
    t.report('args', '"calledWithArgs" should be used when arguments are present');
    t.end();
});

test('plugin-tape: convert-called-with-no-args-to-called-with: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-tape: convert-called-with-no-args-to-called-with: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});
