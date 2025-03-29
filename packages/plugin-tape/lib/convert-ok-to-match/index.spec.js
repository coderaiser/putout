import {createTest} from '@putout/test';
import * as convertOkToMatch from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-ok-to-match', convertOkToMatch],
    ],
});

test('plugin-tape: convert-ok-to-match: report: ok', (t) => {
    t.report('ok', `Use 't.match()' instead of 't.ok()'`);
    t.end();
});

test('plugin-tape: convert-ok-to-match: transform: ok', (t) => {
    t.transform('ok');
    t.end();
});

test('plugin-tape: convert-ok-to-match: transform: test', (t) => {
    t.transform('test');
    t.end();
});

test('plugin-tape: convert-ok-to-match: transform: message', (t) => {
    t.transform('message');
    t.end();
});

test('plugin-tape: convert-ok-to-match: no transform: keys', (t) => {
    t.noTransform('keys');
    t.end();
});
