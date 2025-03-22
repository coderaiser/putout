import {createTest} from '@putout/test';
import * as strictMode from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['strict-mode', strictMode],
    ],
});

test('plugin-strict-mode: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});
