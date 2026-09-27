import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-destructuring', plugin],
    ],
});

test('logical-expressions: apply-destructuring: report', (t) => {
    t.report('apply-destructuring', `Destructure duplicate call`);
    t.end();
});

test('logical-expressions: apply-destructuring: transform', (t) => {
    t.transform('apply-destructuring');
    t.end();
});

test('logical-expressions: apply-destructuring: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});
