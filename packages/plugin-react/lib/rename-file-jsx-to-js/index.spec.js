import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-file-jsx-to-js', plugin],
    ],
});

test('react: rename-file-jsx-to-js: report', (t) => {
    t.report('rename-file-jsx-to-js', ``);
    t.end();
});

test('react: rename-file-jsx-to-js: transform', (t) => {
    t.transform('rename-file-jsx-to-js');
    t.end();
});
