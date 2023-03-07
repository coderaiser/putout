'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'maybe/noop': convert,
});

test('plugin-maybe: noop: report', (t) => {
    t.report('noop', `Use 'noop()'`);
    t.end();
});

test('plugin-maybe: noop: transform', (t) => {
    t.transform('noop');
    t.end();
});

test('plugin-maybe: noop: no transform', (t) => {
    t.noTransform('declared');
    t.end();
});

test('plugin-maybe: noop: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});
