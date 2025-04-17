import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-commonjs-to-esm', plugin],
    ],
});

test('typescript: convert-commonjs-to-esm: report', (t) => {
    t.report('convert-commonjs-to-esm', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('typescript: convert-commonjs-to-esm: transform', (t) => {
    t.transform('convert-commonjs-to-esm');
    t.end();
});
