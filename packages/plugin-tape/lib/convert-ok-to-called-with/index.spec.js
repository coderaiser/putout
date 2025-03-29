import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-ok-to-called-with', convert],
    ],
});

test('plugin-tape: convert-ok-to-called-with: report: called-with', (t) => {
    t.report('called-with', `Use 't.calledWith()' instead of 't.ok()'`);
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: report: not-ok', (t) => {
    t.report('not-ok', `Use 't.notCalledWith()' instead of 't.notOk()'`);
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: called-with', (t) => {
    t.transform('called-with');
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: called-with-no-args', (t) => {
    t.transform('called-with-no-args');
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: ok', (t) => {
    t.transform('ok');
    t.end();
});
