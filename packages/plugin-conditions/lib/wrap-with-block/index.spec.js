import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wrap-with-block', plugin],
    ],
});

test('conditions: wrap-with-block: report', (t) => {
    t.report('wrap-with-block', `Lexical declaration cannot appear in single-statement-context`);
    t.end();
});

test('conditions: wrap-with-block: transform', (t) => {
    t.transform('wrap-with-block');
    t.end();
});
