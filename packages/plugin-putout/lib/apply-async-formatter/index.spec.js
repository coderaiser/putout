import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-async-formatter', convert],
    ],
});

test('plugin-tape: apply-async-formatter: report: formatter', (t) => {
    t.report('formatter', 'Use Async API to test Formatter');
    t.end();
});

test('plugin-tape: formatter', (t) => {
    t.transform('formatter');
    t.end();
});
