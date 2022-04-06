'use strict';

const {createTest} = require('@putout/test');
const applyStub = require('.');

const test = createTest(__dirname, {
    'tape/apply-stub': applyStub,
});

test('plugin-tape: apply-stub: report', (t) => {
    t.report('fn', `Use 'stub()' instead of creating a function`);
    t.end();
});

test('plugin-tape: apply-stub: transform', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-tape: apply-stub: no transform: no-test', (t) => {
    t.noTransform('no-var');
    t.end();
});

