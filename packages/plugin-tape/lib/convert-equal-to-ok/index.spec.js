import {createTest} from '@putout/test';
import * as convertEqualToOk from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-equal-to-ok', convertEqualToOk],
    ],
});

test('plugin-tape: convert-equal-to-ok: report: equal', (t) => {
    t.report('equal', `Use 't.ok(result)' instead of 't.equal(result, true)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-ok: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: convert-equal-to-ok: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

test('plugin-tape: convert-equal-to-ok: no transform: false', (t) => {
    t.noTransform('false');
    t.end();
});
