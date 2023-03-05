'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'apply-maybe/noop': convert,
});

test('plugin-apply-maybe: noop: report', (t) => {
    t.report('noop', `Use 'noop()'`);
    t.end();
});

test('plugin-apply-maybe: noop: transform', (t) => {
    t.transform('noop');
    t.end();
});

test('plugin-apply-maybe: noop: no transform', (t) => {
    t.noTransform('declared');
    t.end();
});

test('plugin-apply-maybe: noop: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});
