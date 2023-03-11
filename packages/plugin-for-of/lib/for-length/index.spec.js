'use strict';

const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');

const {createTest} = require('@putout/test');
const convertForToForOf = require('./index.js');

const test = createTest(__dirname, {
    'for-of/length': convertForToForOf,
});

test('plugin-for-of: for-length: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});

test('plugin-for-of: for-length: no transform: no-body', (t) => {
    t.noTransform('no-body');
    t.end();
});

test('plugin-for-of: for-length: no transform: no-body1', (t) => {
    t.noTransform('entries');
    t.end();
});
