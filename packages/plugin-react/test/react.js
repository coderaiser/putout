import {createTest} from '@putout/test';
import * as react from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: remove-useless-provider', (t) => {
    t.transform('remove-useless-provider');
    t.end();
});

test('plugin-react: transform: remove-implicit-ref-return', (t) => {
    t.transform('remove-implicit-ref-return');
    t.end();
});

test('plugin-react: transform: remove-useless-forward-ref', (t) => {
    t.transform('remove-useless-forward-ref');
    t.end();
});

test('plugin-react: transform: apply-create-root', (t) => {
    t.transform('apply-create-root');
    t.end();
});

test('plugin-react: no report: apply-jsx-to-imported-file', (t) => {
    t.noReport('apply-jsx-to-imported-file');
    t.end();
});

test('plugin-react: transform: rename-file-js-to-jsx', (t) => {
    t.transform('rename-file-js-to-jsx');
    t.end();
});

test('plugin-react: transform: rename-file-jsx-to-js', (t) => {
    t.transform('rename-file-jsx-to-js');
    t.end();
});

test('plugin-react: transform: convert-namespace-to-default-in-react-test-renderer', (t) => {
    t.transform('convert-namespace-to-default-in-react-test-renderer');
    t.end();
});

test('plugin-react: transform: apply-default-to-jsx-string', (t) => {
    t.transform('apply-default-to-jsx-string');
    t.end();
});

test('plugin-react: transform: remove-useless-memoizations', (t) => {
    t.transform('remove-useless-memoizations');
    t.end();
});
