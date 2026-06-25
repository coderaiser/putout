import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-from-params', plugin],
    ],
});

test('parens: remove-useless-from-params: report', (t) => {
    t.report('remove-useless-from-params', `Avoid useless parens: '((b))' -> '(b)'`);
    t.end();
});

test('parens: remove-useless-from-params: transfromm', (t) => {
    t.transform('remove-useless-from-params');
    t.end();
});

test('parens: remove-useless-from-params: report: destructuring', (t) => {
    t.report('destructuring', `Avoid useless parens: '(({b}))' -> '({b})'`);
    t.end();
});

test('parens: remove-useless-from-params: report: couple', (t) => {
    t.report('couple', `Avoid useless parens: '((a, b))' -> '(a, b)'`);
    t.end();
});
