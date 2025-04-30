import {createTest} from '@putout/test';
import * as plugin from '../lib/split-call-with-destructuring.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-call-with-destructuring', plugin],
    ],
});

test('putout: split-call-with-destructuring: report', (t) => {
    t.report('split-call-with-destructuring', `Split call with destructuring`);
    t.end();
});

test('putout: split-call-with-destructuring: transform', (t) => {
    t.transform('split-call-with-destructuring');
    t.end();
});
