import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-call', plugin],
    ],
});

test('putout: destructuring: split-call: report', (t) => {
    t.report('split-call', `Split call with destructuring`);
    t.end();
});

test('putout: destructuring: split-call: transform', (t) => {
    t.transform('split-call');
    t.end();
});
