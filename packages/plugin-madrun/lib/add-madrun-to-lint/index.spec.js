'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'add-madrun-to-lint': require('.'),
});

test('madrun: add madrun to lint: report', (t) => {
    t.report('lint', '"lint" should check "madrun.js"');
    t.end();
});

test('madrun: add madrun to lint: transform', (t) => {
    t.transform('lint');
    t.end();
});

