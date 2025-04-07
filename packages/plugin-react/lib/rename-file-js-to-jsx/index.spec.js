import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-file-js-to-jsx', plugin],
    ],
});

test('react: rename-file-js-to-jsx: report', (t) => {
    t.report('rename-file-js-to-jsx', ``);
    t.end();
});

test('react: rename-file-js-to-jsx: transform', (t) => {
    t.transform('rename-file-js-to-jsx');
    t.end();
});
