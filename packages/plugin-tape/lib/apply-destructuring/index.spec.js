'use strict';

const {createTest} = require('@putout/test');
const applyStub = require('.');

const test = createTest(__dirname, {
    'tape/apply-destructuring': applyStub,
});

test('plugin-tape: apply-destructuring: report', (t) => {
    t.report('apply-destructuring', `Use destructuring when using 'stub()' in 'test()'`);
    t.end();
});

test('plugin-tape: apply-destructuring: transform', (t) => {
    t.transform('apply-destructuring');
    t.end();
});

test('plugin-tape: apply-destructuring: no transform: no-stub', (t) => {
    t.noTransform('no-stub');
    t.end();
});

