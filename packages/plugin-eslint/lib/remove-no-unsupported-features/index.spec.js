'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'eslint/remove-no-unsupported-features': plugin,
});

test('putout: plugin-eslint: remove-no-unsupported-features: report', (t) => {
    t.report('remove-no-unsupported-features', `Remove 'node/no-unsupported-features'`);
    t.end();
});

test('putout: plugin-eslint: remove-no-unsupported-features: transform', (t) => {
    t.transform('remove-no-unsupported-features');
    t.end();
});

