import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['is-jsx', plugin],
    ],
});

test('rename-js-to-jsx: is-jsx: report', (t) => {
    t.report('is-jsx', ``);
    t.end();
});

test('rename-js-to-jsx: is-jsx: no transform', (t) => {
    t.noTransform('is-jsx');
    t.end();
});
