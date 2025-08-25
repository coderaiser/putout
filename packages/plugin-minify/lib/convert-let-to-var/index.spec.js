import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-let-to-var', plugin],
    ],
});

test('minify: convert-let-to-var: report', (t) => {
    t.report('convert-let-to-var', `Use 'var' instead of 'let' inside label`);
    t.end();
});

test('minify: convert-let-to-var: transform', (t) => {
    t.transform('convert-let-to-var');
    t.end();
});
