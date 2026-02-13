import {createTest} from '@putout/test';
import * as convertCommonjsToEsm from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as putout from '@putout/plugin-putout';
import * as removeUnusedVariables from '../remove-unused/index.js';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-keywords-from-variables', plugin],
    ],
});

test('putout: plugin-variables: extract-keywords: report: extract-keywords-from-variables', (t) => {
    t.report('extract-keywords-from-variables', `Extract 'export' from variable`);
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: extract-keywords-from-variables', (t) => {
    t.transform('extract-keywords-from-variables');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: export-let', (t) => {
    t.transform('export-let');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: export-var', (t) => {
    t.transform('export-var');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: let-no-init', (t) => {
    t.transform('let-no-init');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('putout: plugin-variables: extract-keywords: transform: convert-commonjs-to-esm', (t) => {
    t.transform('convert-commonjs-to-esm', {
        convertCommonjsToEsm,
        putout,
        removeUnusedVariables,
    });
    t.end();
});

test('putout: plugin-variables: extract-keywords: report: const', (t) => {
    t.report('const', `Extract 'const' from variable`);
    t.end();
});

test('putout: plugin-variables: extract-keywords: no report: assert', (t) => {
    t.noReport('assert');
    t.end();
});
