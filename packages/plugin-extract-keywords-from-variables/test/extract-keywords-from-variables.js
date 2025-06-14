import {createTest} from '@putout/test';
import * as convertCommonjsToEsm from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as putout from '@putout/plugin-putout';
import * as removeUnusedVariables from '@putout/plugin-remove-unused-variables';
import * as plugin from '../lib/extract-keywords-from-variables.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-keywords-from-variables', plugin],
    ],
});

test('putout: extract-keywords-from-variables: report', (t) => {
    t.report('extract-keywords-from-variables', `Extract 'export' from variable`);
    t.end();
});

test('putout: extract-keywords-from-variables: transform', (t) => {
    t.transform('extract-keywords-from-variables');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: export-let', (t) => {
    t.transform('export-let');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: export-var', (t) => {
    t.transform('export-var');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: let-no-init', (t) => {
    t.transform('let-no-init');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('putout: extract-keywords-from-variables: transform: convert-commonjs-to-esm', (t) => {
    t.transform('convert-commonjs-to-esm', {
        convertCommonjsToEsm,
        putout,
        removeUnusedVariables,
    });
    t.end();
});

test('putout: extract-keywords-from-variables: report: const', (t) => {
    t.report('const', `Extract 'const' from variable`);
    t.end();
});
