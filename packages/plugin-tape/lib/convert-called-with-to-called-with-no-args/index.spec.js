import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-called-with-to-called-with-no-args', convert],
    ],
});

test('plugin-tape: convert-called-with-to-called-with-no-args: report: no-args', (t) => {
    t.report('no-args', `Use 'calledWithNoArgs()' when arguments are absent`);
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: empty-array', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: message', (t) => {
    t.transform('message');
    t.end();
});
