'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'eslint/remove-no-missing': plugin,
});

test('putout: plugin-eslint: remove-no-missing: report', (t) => {
    t.report('remove-no-missing', `Remove 'node/no-missing-(require,import)'`);
    t.end();
});

test('putout: plugin-eslint: remove-no-missing: transform', (t) => {
    t.transform('remove-no-missing');
    t.end();
});

