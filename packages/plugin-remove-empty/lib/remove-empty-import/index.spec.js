'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'remove-empty-import': require('.'),
});

test('plugin-remove-empty: import: report', (t) => {
    t.report('import', 'Empty import statement');
    t.end();
});

test('plugin-remove-empty: import', (t) => {
    t.transform('import', '\n\n');
    t.end();
});

test('plugin-remove-empty: import: not empty', (t) => {
    t.noTransform('not-empty-import', '\n\n');
    t.end();
});

