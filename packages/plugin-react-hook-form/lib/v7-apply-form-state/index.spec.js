'use strict';

const {createTest} = require('@putout/test');
const apply = require('.');

const test = createTest(__dirname, {
    'apply-form-state': apply,
});

test('plugin-nextjs: v7-apply-form-state: report', (t) => {
    t.report('v7-apply-form-state', `Use 'formState.errors' instead of 'errors'`);
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: transform', (t) => {
    t.transform('v7-apply-form-state');
    t.end();
});

