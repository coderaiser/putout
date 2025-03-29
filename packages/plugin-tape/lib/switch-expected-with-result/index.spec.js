import {createTest} from '@putout/test';
import * as switchExpectedWithResult from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/switch-expected-with-result', switchExpectedWithResult],
    ],
});

test('plugin-tape: switch-expected-with-result: report: equal', (t) => {
    t.report('equal', '"result" should be before "expected"');
    t.end();
});

test('plugin-tape: switch-expected-with-result: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: switch-expected-with-result: transform: deep-equal', (t) => {
    t.transform('deep-equal');
    t.end();
});

test('plugin-tape: switch-expected-with-result: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});
