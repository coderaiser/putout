import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-useless-parens', plugin],
    ],
});

test('plugin-typescript: remove-useless-parens: report', (t) => {
    t.report('remove-useless-parens', 'Avoid useless parens');
    t.end();
});

test('plugin-typescript: remove-useless-parens: transform', (t) => {
    t.transform('remove-useless-parens');
    t.end();
});

test('plugin-typescript: remove-useless-parens: no transform: nested', (t) => {
    t.noTransform('nested');
    t.end();
});

test('plugin-typescript: remove-useless-parens: transform: generic', (t) => {
    t.transform('generic');
    t.end();
});

test('plugin-typescript: remove-useless-parens: no transform: overlap', (t) => {
    t.noTransform('overlap');
    t.end();
});
