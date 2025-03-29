import {createTest} from '@putout/test';
import * as convertEqualToCalledOnce from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-equal-to-called-once', convertEqualToCalledOnce],
    ],
});

test('plugin-tape: convert-equal-to-called-once: report: equal', (t) => {
    t.report('equal', `Use 't.calledOnce(fn)' instead of 't.equal(fn.callCount, 1)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-called-once: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});
