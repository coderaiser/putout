'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'eslint/remove-no-unpublished-require': plugin,
});

test('putout: plugin-eslint: remove-no-unpublished-require-in-extends: report', (t) => {
    t.report('remove-no-unpublished-require', `Remove 'node/no-unpublished-require'`);
    t.end();
});

test('putout: plugin-eslint: remove-no-unpublished-require-in-extends: transform', (t) => {
    t.transform('remove-no-unpublished-require');
    t.end();
});

