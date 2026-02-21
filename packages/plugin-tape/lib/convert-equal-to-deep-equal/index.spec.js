import {createTest} from '@putout/test';
import * as convertEqualToOk from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-equal-to-deep-equal', convertEqualToOk],
    ],
});

test('plugin-tape: convert-equal-to-deep-equal: report: equal', (t) => {
    t.report('equal', `Use 't.deepEqual()' when comparing Objects an Arrays`);
    t.end();
});

test('plugin-tape: convert-equal-to-deep-equal: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: convert-equal-to-deep-equal: transform: buffer', (t) => {
    t.transform('buffer');
    t.end();
});

test('plugin-tape: convert-equal-to-deep-equal: transform: date', (t) => {
    t.transform('date');
    t.end();
});

test('plugin-tape: convert-equal-to-deep-equal: no report: array', (t) => {
    t.noReport('array');
    t.end();
});
