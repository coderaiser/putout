import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/remove-useless-not-called-args', convert],
    ],
});

test('plugin-tape: remove-useless-not-called-args: report: args', (t) => {
    t.report('args', 'Remove useless "notCalled" args');
    t.end();
});

test('plugin-tape: remove-useless-not-called-args: transform: args', (t) => {
    t.transform('args');
    t.end();
});
