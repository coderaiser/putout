import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-let-to-var-inside-label', plugin],
    ],
});

test('minify: convert-let-to-var-inside-label: report', (t) => {
    t.report('convert-let-to-var-inside-label', `Use 'var' instead of 'let' inside label`);
    t.end();
});

test('minify: convert-let-to-var-inside-label: transform', (t) => {
    t.transform('convert-let-to-var-inside-label');
    t.end();
});
