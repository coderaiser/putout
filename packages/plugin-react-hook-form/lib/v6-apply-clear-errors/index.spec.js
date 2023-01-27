'use strict';

const {createTest} = require('@putout/test');
const applyClearErrors = require('.');

const test = createTest(__dirname, {
    'apply-clear-errors': applyClearErrors,
});

test('plugin-nextjs: apply-clear-errors: report', (t) => {
    t.report('apply-clear-errors', `Use 'clearErrors' instead of 'clearError'`);
    t.end();
});

test('plugin-nextjs: apply-clear-errors: transform', (t) => {
    t.transform('apply-clear-errors');
    t.end();
});

