import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-ternary', plugin],
    ],
});

test('plugin-minify: apply-ternary: report', (t) => {
    t.report('apply-ternary', `Use 'ternary' instead of 'if condition'`);
    t.end();
});

test('plugin-minify: apply-ternary: transform', (t) => {
    t.transform('apply-ternary');
    t.end();
});
