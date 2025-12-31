import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-destructuring', plugin],
    ],
});

test('try-catch: apply-destructuring: report', (t) => {
    t.report('apply-destructuring', `Use '{tryCatch}' instead of 'tryCatch'`);
    t.end();
});

test('try-catch: apply-destructuring: transform', (t) => {
    t.transform('apply-destructuring');
    t.end();
});
