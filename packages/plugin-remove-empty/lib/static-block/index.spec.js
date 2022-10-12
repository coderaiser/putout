'use strict';

const {createTest} = require('@putout/test');
const staticBlock = require('.');

const test = createTest(__dirname, {
    'remove-empty/static-block': staticBlock,
});

test('plugin-remove-empty: static-block: report', (t) => {
    t.report('static-block', 'Avoid useless empty static blocks');
    t.end();
});

test('plugin-remove-empty: static-block: transform', (t) => {
    t.transform('static-block');
    t.end();
});

