import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-js-to-ts', plugin],
    ],
});

test('markdown: convert-js-to-ts: report', (t) => {
    t.report('convert-js-to-ts', `Use a 'ts' instead of 'js' fence for TypeScript`);
    t.end();
});

test('markdown: convert-js-to-ts: transform', (t) => {
    t.transform('convert-js-to-ts');
    t.end();
});

test('markdown: convert-js-to-ts: no report: not-markdown', (t) => {
    t.noReport('not-markdown');
    t.end();
});
