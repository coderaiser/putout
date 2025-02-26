'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-export-from', plugin],
    ],
});

test('esm: apply-export-from: report', (t) => {
    t.report('apply-export-from', `Use 'export *' instead of 'import/export'`);
    t.end();
});

test('esm: apply-export-from: transform', (t) => {
    t.transform('apply-export-from');
    t.end();
});
