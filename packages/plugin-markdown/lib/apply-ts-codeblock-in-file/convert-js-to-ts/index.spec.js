import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-ts-codeblock-in-file', plugin],
    ],
});

test('markdown: apply-ts-codeblock-in-file: convert-js-to-ts: report', (t) => {
    t.report('convert-js-to-ts', `Use 'ts' instead of 'js' fence for TypeScript`);
    t.end();
});

test('markdown: apply-ts-codeblock-in-file: convert-js-to-ts: transform', (t) => {
    t.transform('convert-js-to-ts');
    t.end();
});

test('markdown: apply-ts-codeblock-in-file: convert-js-to-ts: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('markdown: apply-ts-codeblock-in-file: convert-js-to-ts: no report: not-markdown', (t) => {
    t.noReport('not-markdown');
    t.end();
});
