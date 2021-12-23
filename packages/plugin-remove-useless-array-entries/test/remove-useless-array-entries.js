'use strict';

const {createTest} = require('@putout/test');
const removeUselessSpread = require('..');

const test = createTest(__dirname, {
    'remove-useless-array-entries': removeUselessSpread,
});

test('plugin-remove-useless-array-entries: report', (t) => {
    t.report('for-of', `Remove useless '.entries()'`);
    t.end();
});

test('plugin-remove-useless-array-entries: transform: array', (t) => {
    t.transform('for-of');
    t.end();
});

