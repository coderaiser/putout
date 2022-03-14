'use strict';

const {createTest} = require('@putout/test');
const applyEarlyReturn = require('..');

const test = createTest(__dirname, {
    'apply-early-return': applyEarlyReturn,
});

test('plugin-apply-early-return: transform: report', (t) => {
    t.report('else', 'Apply early return');
    t.end();
});

test('plugin-apply-early-return: transform: else', (t) => {
    t.transform('else');
    t.end();
});

