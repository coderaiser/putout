'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
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

test('putout: extract-keywords-from-variables: report: const', (t) => {
    t.report('const', `Extract 'const' from variable`);
    t.end();
});
